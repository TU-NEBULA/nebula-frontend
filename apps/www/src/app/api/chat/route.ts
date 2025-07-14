import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.AI_API_URL;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, message, session_id } = body;

    const requestBody = session_id ? { userId, message, session_id } : { userId, message };

    const response = await fetch(`${baseUrl}/chat/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 스트림 응답을 그대로 전달
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
          }
        } catch (error) {
          controller.error(error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        code: "BAD_REQUEST",
        message: `Error: ${(error as Error).message}`,
        data: null,
      },
      { status: 400 }
    );
  }
}

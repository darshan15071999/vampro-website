import { Resend } from "resend";

interface Env {
  VAMPRO_KV: KVNamespace;
  RESEND_API_KEY: string;
}

// GET /api/waitlist
export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const count =
      parseInt(
        (await context.env.VAMPRO_KV.get("waitlist_count")) || "25"
      );

    return Response.json({
      success: true,
      count,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "Failed to fetch waitlist count",
      },
      { status: 500 }
    );
  }
};

// POST /api/waitlist
export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { name, email, creatorType, source } = await context.request.json<{
      name: string;
      email: string;
      creatorType: string;
      source?: string;
    }>();

    // Validation
    if (!name?.trim()) {
      return Response.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    if (!email?.trim()) {
      return Response.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    if (!creatorType?.trim()) {
      return Response.json(
        { success: false, error: "Creator type is required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if already joined
    const existingUser = await context.env.VAMPRO_KV.get(
      `waitlist:${normalizedEmail}`
    );

    if (existingUser) {
      const currentCount =
        parseInt(
          (await context.env.VAMPRO_KV.get("waitlist_count")) || "25"
        );

      return Response.json({
        success: true,
        alreadyJoined: true,
        count: currentCount,
      });
    }

    // Save user
    await context.env.VAMPRO_KV.put(
      `waitlist:${normalizedEmail}`,
      JSON.stringify({
        name,
        email: normalizedEmail,
        creatorType,
        source,
        joinedAt: new Date().toISOString(),
      })
    );

    // Get current count
    const currentCount =
      parseInt(
        (await context.env.VAMPRO_KV.get("waitlist_count")) || "25"
      );

    const updatedCount = currentCount + 1;

    // Save updated count
    await context.env.VAMPRO_KV.put(
      "waitlist_count",
      updatedCount.toString()
    );

    // Send Email
    const resend = new Resend(
      context.env.RESEND_API_KEY
    );

    await resend.emails.send({
      from: "Vampro Waitlist <waitlist@vampro.in>",
      to: "support@vampro.in",
      replyTo: normalizedEmail,
      subject: "Waitlist Request",
      text: `
New Waitlist Request

Name: ${name}
Email: ${normalizedEmail}
Creator Type: ${creatorType}
Source: ${source || "Unknown"}
Submitted At: ${new Date().toLocaleString()}
`,
    });

    return Response.json({
      success: true,
      count: updatedCount,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: "Failed to join waitlist",
      },
      { status: 500 }
    );
  }
};
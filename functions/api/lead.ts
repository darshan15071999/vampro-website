interface Env {
  BREVO_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { name, email, creatorType, source, title, product } = await context.request.json<{
      name: string;
      email: string;
      creatorType: string;
      source: string;
      title?: string;
      product?: string;
    }>();

    // Validation
    if (!name?.trim() || !email?.trim()) {
      return Response.json(
        { success: false, error: "Name and Email are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const [firstName, ...lastNames] = name.trim().split(" ");
    const lastName = lastNames.join(" ") || "-";

    const apiKey = context.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error("Missing BREVO_API_KEY environment variable");
      return Response.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Determine distinct source marker and title per page/product
    let distinctSource = source || "General";
    if (product && !distinctSource.includes(product)) {
      distinctSource = `${product} - ${distinctSource}`;
    }

    let distinctTitle = title || "User";
    if (product && !distinctTitle.includes(product)) {
      distinctTitle = `${product} ${title ? title : 'Lead'}`;
    }

    const brevoPayload = {
      email: normalizedEmail,
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
        COMPANY: creatorType,
        SOURCE: distinctSource,
        TITLE: distinctTitle,
      },
      updateEnabled: true, // Update contact if it already exists
    };

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(brevoPayload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("Brevo API error:", data);
      
      // Handle the case where the contact already exists but updateEnabled might not have worked as expected
      if (data.code === "duplicate_parameter") {
          return Response.json({ success: true, message: "Contact already exists" });
      }

      return Response.json(
        { success: false, error: data.message || "Failed to submit lead to Brevo" },
        { status: response.status }
      );
    }

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Lead submission error:", error);

    return Response.json(
      {
        success: false,
        error: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
};

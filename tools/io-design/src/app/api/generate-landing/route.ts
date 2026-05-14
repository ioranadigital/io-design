import { NextRequest, NextResponse } from 'next/server';
import type { LandingConfig } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: LandingConfig = await request.json();

    if (!body.projectConfig?.brandName || !body.conversionBlock?.headline) {
      return NextResponse.json(
        { error: 'ProjectConfig and ConversionBlock are required' },
        { status: 400 }
      );
    }

    const generatedHtml = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${body.projectConfig.brandName}</title>
        <meta name="description" content="${body.semanticStructure.metaDescription}">
      </head>
      <body>
        <h1>${body.conversionBlock.headline}</h1>
      </body>
      </html>
    `;

    return NextResponse.json({
      success: true,
      landingUrl: `https://io-design.vercel.app/${Date.now()}`,
      htmlContent: generatedHtml,
      metadata: {
        brandName: body.projectConfig.brandName,
        blueprint: body.projectConfig.blueprint,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate landing' },
      { status: 500 }
    );
  }
}

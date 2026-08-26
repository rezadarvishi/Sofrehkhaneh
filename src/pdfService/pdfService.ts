import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Recipe } from '../types/recipe';

export const pdfService = {
  async exportRecipeToPDF(recipe: Recipe): Promise<void> {
    const html = `
      <html dir="rtl" lang="fa">
        <head>
          <style>
            body { font-family: Tahoma, sans-serif; padding: 20px; color: #2B2118; }
            h1 { color: #E07A3F; }
            h2 { border-bottom: 1px solid #EDE1D3; padding-bottom: 5px; margin-top: 20px; }
            ul { padding-right: 20px; }
            li { margin-bottom: 5px; }
          </style>
        </head>
        <body>
          <h1>${recipe.title}</h1>
          <p>${recipe.description}</p>
          
          <h2>مواد لازم</h2>
          <ul>
            ${recipe.ingredients.map(ing => `<li>${ing.name}: ${ing.amount ?? ''} ${ing.unit ?? ''}</li>`).join('')}
          </ul>
          
          <h2>مراحل پخت</h2>
          <ul>
            ${recipe.steps.map(step => `<li>${step.text}</li>`).join('')}
          </ul>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        alert('امکان اشتراک‌گذاری فایل روی این دستگاه وجود ندارد.');
      }
    } catch (error) {
      console.error('PDF Export Error:', error);
      alert('خطا در ساخت فایل PDF.');
    }
  }
};
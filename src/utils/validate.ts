import { CreateArticleType } from "./types";

export function validateNewArticle(article: CreateArticleType): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
  
    if (!article.title.trim()) {
      errors.push("Title cannot be empty.");
    }
  
    if (!article.content.trim()) {
      errors.push("Content cannot be empty.");
    }
  
    if (!Array.isArray(article.tags) || !article.tags.every(tag => typeof tag === "string")) {
      errors.push("Tags must be an array of strings.");
    }
  
    if (article.image_url && !/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(article.image_url.toString())) {
      errors.push("Image URL must be a valid URL.");
    }
  
    return { valid: errors.length === 0, errors };
  }
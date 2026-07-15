export const LANDLORD_SOURCES = new Set(["landlord_cta", "landlord_cta_form", "landlords_page"])

export type InquiryCategory = "student" | "landlord"

export function getInquiryCategory(source?: string | null): InquiryCategory {
  return source && LANDLORD_SOURCES.has(source) ? "landlord" : "student"
}
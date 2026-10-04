/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WHATSAPP_NUMBER: string
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// /// <reference types="vite/client" />

// interface ImportMetaEnv {
//   readonly VITE_WHATSAPP_NUMBER: string
// }

// interface ImportMeta {
//   readonly env: ImportMetaEnv
// }
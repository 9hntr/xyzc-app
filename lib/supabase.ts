import { createClient } from "@supabase/supabase-js";
import { siteConfig } from "@/siteConfig";

const supabaseUrl = siteConfig.db.supabase.projectUrl;
const supabaseKey = siteConfig.db.supabase.projectKey;

export const supabase = createClient(supabaseUrl, supabaseKey);

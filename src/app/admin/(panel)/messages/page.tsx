import { Mail } from "lucide-react";
import { isDatabaseConfigured } from "@/lib/db/client";
import { getContactMessages } from "@/lib/admin/messages";
import {
  AdminEmptyState,
  AdminMetaBadge,
  AdminPageHeader,
} from "@/components/admin/AdminUi";
import { MessagesInbox } from "@/components/admin/MessagesInbox";

const schemaHelp =
  "Dans Supabase → SQL Editor, exécute le fichier sql/schema.sql du projet, puis recharge cette page.";

export default async function AdminMessagesPage() {
  const dbReady = isDatabaseConfigured();

  if (!dbReady) {
    return (
      <div>
        <AdminPageHeader
          title="Messages"
          description="Boîte de réception contact"
        />
        <AdminEmptyState
          title="Boîte mail bientôt prête"
          description="Branche Supabase pour stocker et répondre aux messages du formulaire contact."
          icon={<Mail size={22} />}
        />
      </div>
    );
  }

  const { messages, schemaMissing } = await getContactMessages();

  if (schemaMissing) {
    return (
      <div>
        <AdminPageHeader
          title="Messages"
          description="Boîte de réception contact"
        />
        <AdminEmptyState
          title="Tables manquantes"
          description={schemaHelp}
          icon={<Mail size={22} />}
        />
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title="Messages"
        description="Messages reçus via le formulaire contact"
        meta={
          <AdminMetaBadge className="border-violet-500/30 bg-violet-50 text-violet-800">
            <span className="font-semibold tabular-nums text-violet-700">
              {messages.length}
            </span>{" "}
            message{messages.length > 1 ? "s" : ""}
          </AdminMetaBadge>
        }
      />
      <MessagesInbox initialMessages={messages} />
    </div>
  );
}

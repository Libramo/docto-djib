import { auth } from "@/auth";
import ProfileForm from "@/components/Forms/ProfileForm";

export default async function ProfilePage() {
  const session = await auth(); // Replace with your actual logic

  const user = session?.user;

  if (!user) return <div>Non connecté</div>;

  return (
    <div className="max-w-2xl p-6">
      <h1 className="text-2xl font-bold mb-6">Mon Profil</h1>
      <ProfileForm userId={user.id} user={user} />
    </div>
  );
}

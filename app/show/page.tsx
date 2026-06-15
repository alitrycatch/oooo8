import { prisma } from "@/lib/prisma";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-2xl mx-auto bg-white shadow rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Users List</h1>

        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users found</p>
        ) : (
          <ul className="space-y-3">
            {users.map((user) => (
              <li
                key={user.id}
                className="border rounded-lg p-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{user.name ?? "No name"}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                <span className="text-xs text-gray-400">ID: {user.id}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

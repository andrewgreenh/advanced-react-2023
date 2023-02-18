import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

export function FixTheRuleBreaks() {
  const [initialUsers, setInitialUsers] = useState<User[] | null>(null);

  if (!initialUsers) {
    loadUsers().then((users) => setInitialUsers(users));
  }

  if (!initialUsers) return <p>Loading...</p>;

  return <UserManagement initialUsers={initialUsers} />;
}

function UserManagement(props: { initialUsers: User[] }) {
  const [users, setUsers] = useState(props.initialUsers);

  useEffect(() => {
    document.addEventListener("click", () => {
      setUsers((users) =>
        [...users].sort(() => (Math.random() < 0.5 ? -1 : 1))
      );
    });
  }, []);

  function addUser() {
    users.push(randomUser());
  }

  function deleteUser(user: User) {
    setUsers(users.filter((u) => u !== user));
  }

  function renameUser(user: User) {
    const userToBeRenamed = users.find((u) => u.id === user.id);

    if (!userToBeRenamed) return;

    userToBeRenamed.name = faker.name.fullName();

    const newUsers = users.map((u) =>
      u.id === userToBeRenamed.id ? userToBeRenamed : u
    );

    setUsers(newUsers);
  }

  return (
    <>
      <button onClick={addUser}>Add user</button>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex gap-4">
            <User user={user} />

            <button
              onClick={(e) => {
                e.stopPropagation();
                renameUser(user);
              }}
            >
              Rename
            </button>
            <button onClick={() => deleteUser(user)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

function User(props: { user: User }) {
  return <span className="font-bold">{props.user.name}</span>;
}

type User = {
  name: string;
  id: string;
};

function randomUser(): User {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
  };
}

const dummyUsers = [1, 2, 3].map(randomUser);

async function loadUsers() {
  await new Promise((r) => setTimeout(r, 2000));
  return dummyUsers;
}

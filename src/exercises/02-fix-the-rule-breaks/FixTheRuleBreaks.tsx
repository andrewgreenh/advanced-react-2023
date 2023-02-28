import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

export function FixTheRuleBreaks() {
  const [initialUsers, setInitialUsers] = useState<User[] | null>(null);
  const [x, setX] = useState(0);

  useEffect(() => {
    let cancelled = false;
    loadUsers().then((users) => {
      if (cancelled) return;
      setInitialUsers(users);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!initialUsers)
    return (
      <p>
        <button onClick={() => setX(x + 1)}>{x}</button>Loading...
      </p>
    );

  return (
    <>
      <button onClick={() => setX(x + 1)}>{x}</button>
      <UserManagement initialUsers={initialUsers} />
    </>
  );
}

function UserManagement(props: { initialUsers: User[] }) {
  const [users, setUsers] = useState(props.initialUsers);

  useEffect(() => {
    function handleClick() {
      // setUsers((users) => faker.helpers.shuffle([...users]));
    }
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  function addUser() {
    setUsers([...users, randomUser()]);
  }

  function deleteUser(user: User) {
    setUsers(users.filter((u) => u !== user));
  }

  function renameUser(user: User) {
    const userToBeRenamed = users.find((u) => u.id === user.id);

    if (!userToBeRenamed) return;

    const newUser = { ...userToBeRenamed, name: faker.name.fullName() };

    const newUsers = users.map((u) => (u.id === newUser.id ? newUser : u));

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
  // useEffect(() => {
  //   console.log(props.user, "changed");
  // }, [props.user]);
  return (
    <span className="font-bold">
      {props.user.name} <input />
    </span>
  );
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

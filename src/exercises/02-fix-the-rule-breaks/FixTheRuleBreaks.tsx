import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

export function FixTheRuleBreaks() {
  const [lightMode, setLightMode] = useState(false);

  return (
    <>
      <button onClick={() => setLightMode(!lightMode)}>Toggle</button>
      <FixTheRuleBreaks1 />
    </>
  );
}

export function FixTheRuleBreaks1() {
  const [initialUsers, setInitialUsers] = useState<User[] | null>(null);

  useEffect(() => {
    let effectCancelled = false;
    loadUsers().then((users) => {
      if (effectCancelled) return;

      setInitialUsers(users);
    });
    return () => {
      effectCancelled = true;
    };
  }, []);

  if (!initialUsers) return <p>Loading...</p>;

  return <UserManagement initialUsers={initialUsers} />;
}

function UserManagement(props: { initialUsers: User[] }) {
  const [users, setUsers] = useState(props.initialUsers);

  useEffect(() => {
    function handleClick() {
      setUsers((users) => faker.helpers.shuffle([...users]));
    }
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  function addUser() {
    // users.push(randomUser());
    setUsers([...users, randomUser()]);
  }

  function deleteUser(user: User) {
    setUsers(users.filter((u) => u !== user));
  }

  function renameUser(user: User) {
    const userToBeRenamed = users.find((u) => u.id === user.id);

    if (!userToBeRenamed) return;

    const userCopy = { ...userToBeRenamed };

    userCopy.name = faker.name.fullName();

    const newUsers = users.map((u) => (u.id === userCopy.id ? userCopy : u));

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
  useEffect(() => {
    console.log("USER CHANGED");
  }, [props.user]);

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
  console.log("Hey!");
  await new Promise((r) => setTimeout(r, 2000));
  return dummyUsers;
}

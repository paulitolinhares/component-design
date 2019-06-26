## Making your (dumb) components smarter

Paulo Linhares - Frontend Developer @ Frontmen

---

# Agenda

- What is a component
- Using input/output to decouple components
- Accepting only the right amount of data to render the component
- Splitting UI from business logic
  - Contributing to the component library
- Lifting state

---

> "Components let you split the UI into independent, reusable pieces, and think about each piece in isolation."

Taken from [React documentation](https://reactjs.org/docs/components-and-props.html)

---

> "A component controls a patch of screen called a view."

Taken from [Angular documentation](https://angular.io/guide/architecture-components)

---

## Using input/output to decouple components

---

<iframe src="http://localhost:3000/addUser" width="100%" height="500px">

---

```jsx
function UserForm() {
  return (
    <form
      onSubmit={e => {
        saveUser({ username, password });
      }}
    >
      {/* ommitted for breivity */}
    </form>
  );
}
```

---

What happens if I want to reuse this component on a different page? (e.g: login or edit user)

---

```javascript
saveUser({ username, password });
```

note: Talk about coupling and how does this line makes this component coupled to the "add new user" use case

---

What can we do to remove the coupling?

---

```jsx
export default function UserForm({ onSubmit }) {
  return (
    <form
      onSubmit={e => {
        onSubmit({ username, password });
      }}
    >
      {/* ommitted for breivity */}
    </form>
  );
}
```

---

```jsx
<UserForm onSubmit={editUser} />
```

```jsx
<UserForm onSubmit={saveUser} />
```

---

Bonus: we now have a component that is easier to test

---

```jsx
it('executes onSubmit callback', () => {
  const cb = jest.fn();
  const component = shallow(<UserForm onSubmit={cb} />);
  const form = component.find('form');
  form.simulate('submit');
  expect(cb).toBeCalled();
})
```

note: Since we are now _injecting_ the function to be executed on submit, it's easier to put a mock and assert it.

---

## Accepting only the right amount of data to render the component

---

Think about your interfaces

![MGM Lion](assets/interfaces.png)

---

## Wall plugs

![Wall plugs](assets/socket.png)

---

## Mouse and keyboard

![Mouse and keyboard](assets/mouse-keyboard.webp) <!-- .element width="500px" -->

---

Interface: The way something interacts with the outside world. Also a way to abstract complexity

---

<iframe src="http://localhost:3000/video/dQw4w9WgXcQ" width="100%" height="500px">

---

```jsx
export default function VideoPage({ match: route }) {
  const { videoId } = route.params;
  return (
    <React.Fragment>
      <h1>YoutubeVideo</h1>
      <YoutubeVideo videoId={videoId} />
      <h1>YoutubeVideoWithRoute</h1>
      <YoutubeVideoWithRoute route={route} />
    </React.Fragment>
  );
}
```

---

```jsx
export default function YoutubeVideoWithRoute({ route }) {
  const { videoId } = route.params;
  return (
    <iframe
      title="youtube"
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${videoId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
```

---

```jsx
export default function YoutubeVideo({ videoId }) {
  return (
    <iframe
      title="youtube"
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${videoId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
```

---

## Some tips:

- Try to avoid changing the data type of your inputs
- If you only use a part of an object, accept that part as input
- Less logic means less bugs
- A well defined interface is a great starting point (and helps refactoring)

note: Remember those are general rules, there might be exceptions!

---

## Splitting UI from business logic

---

It's easier to change the look & feel of your application when the business logic is not entangled to it

---

Dumb components are sometimes called presentational components (for a reason)

---

Third time is the charm! - Contribute to the component library

note: It's hard to antecipate all the use-cases in order to make components for the component library, which is why might be a good idea to derive your components from your actual use cases

---

## Lifting state

![Do you even lift breh?](assets/lift.webp)

---

> "If you don't think managing state is tricky, consider the fact that 80% of all problems in all complex systems are fixed by rebooting." - [@stuarthalloway](https://twitter.com/stuarthalloway/status/1134806008528809985)

---

Pure components are easier to test, faster\* and less succeptible to bugs

---

It's usually a good idea to keep your state logic on your smart components

---

Example: Instagram followers/following list

---

```jsx
function FollowersList() {
  const [followers, setFollowers] = useState([]);
  useEffect(async () => {
    const followers = 
      await fetch("api.instagram.com/followers");

    setFollowers(followers);
  }, []);

  return (
    <ul>
      {followers.map(follower => (
        <li>{follower.name}</li>
      ))}
    </ul>
  );
}
```

---

```jsx
function FollowingList() {
  const [following, setFollowing] = useState([]);
  useEffect(async () => {
    const following = 
      await fetch("api.instagram.com/following");

    setFollowing(following);
  }, []);

  return (
    <ul>
      {following.map(follower => (
        <li>{follower.name}</li>
      ))}
    </ul>
  );
}
```

---

## Time to lift!

---

```jsx
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

```jsx
function FollowersList() {
  const [followers, setFollowers] = useState([]);
  useEffect(async () => {
    const followers = 
      await fetch("api.instagram.com/followers");

    setFollowers(followers);
  }, []);

  return <UserList users={followers} />;
}
```

---

```jsx
function FollowingList() {
  const [following, setFollowing] = useState([]);
  useEffect(async () => {
    const following = 
      await fetch("api.instagram.com/following");

    setFollowing(following);
  }, []);

  return <UserList users={following} />;
}
```

---

## Advantages

<small>

- `<UserList>` is easily testable with mock data because it does not have any business logic

- We can change the look & feel of the followers and following lists by only changing 1 file

- We can change how the list is rendered in one of the 2 pages by replacing `<UserList>` with another component with the same _interface_

- Each of the 3 components has their own clear responsibility (yay, no docs!)

</small>

---

## Thank you!

![T.Hanks](assets/thanks.gif)

Twitter/Github

@paulitolinhares

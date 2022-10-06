import Button from "@mui/material/Button";

export default function Index() {
  return (
    <>
      Hello world!
      <form action="/login" method="get">
        <Button variant="outlined">Login</Button>
      </form>
      <form action="/signup" method="get">
        <Button variant="outlined">Signup</Button>
      </form>
    </>
  );
}

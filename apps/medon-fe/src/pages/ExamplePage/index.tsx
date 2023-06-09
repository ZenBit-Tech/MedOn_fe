import ExampleComponent from 'components/ExampleComponent';
import ExampleCounter from 'components/ExampleCounter';
import ExampleFetchData from 'components/ExampleFetchData';
import ExampleForm from 'components/ExampleForm';

export default function ExamplePage() {
  return (
    <>
      <ExampleComponent />
      <ExampleForm />
      <ExampleCounter />
      <ExampleFetchData />
    </>
  );
}

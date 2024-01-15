import { Form, useFormControl } from '~/components/form';
import Button from '~/components/button';

type FormFields = {
  email: string;
  password: string;
};

function Login() {
  const { control, errors, fields, changer, cleanup, onSubmit } =
    useFormControl<FormFields>({
      email: '',
      password: ''
    });

  // run on server?
  const onSubmitHandler = onSubmit((fields) => {
    // cleanup fields
    console.log(fields);

    cleanup();
  });

  return (
    <main class="rounded-md p-8 w-full md:max-w-md md:border md:border-zinc-700">
      <h1 class="mb-2">FinPerson</h1>
      <p class="mb-4">
        Let's organize your <strong>finance</strong>!
      </p>
      <Form.Control control={control} on:submit={onSubmitHandler}>
        <Form.Input
          name="email"
          type="email"
          placeholder="john@email.com"
          on:change={changer}
          value={fields.email}
          label="E-mail"
          errors={errors.email}
          required
        />
        <Form.Input
          name="password"
          type="password"
          placeholder="********"
          minLength={8}
          maxLength={32}
          label="Password"
          on:change={changer}
          value={fields.password}
          errors={errors.password}
          required
        />
        <Button.Container type="primary" htmlType="submit">
          LOGIN
        </Button.Container>
      </Form.Control>
    </main>
  );
}

export default Login;

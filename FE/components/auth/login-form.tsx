import { Formik } from "formik";
import styles from "./login-form.module.css";
import { Button, Spinner, Form, Alert } from "react-bootstrap";
import * as Yup from "yup";
import { get, post } from "../utils/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  const userValidationSchema = Yup.object({
    username: Yup.string()
      .required("Please provide an email")
      .email("Invalid email format"),
    password: Yup.string().required("Please provide a password"),
  });

  const handleSubmit = async (values: any) => {
    var data = {
      email: values.username,
      password: values.password,
    };
    let response = await post("/login", data, false);
    if (response.data.data[0]) {
      localStorage.setItem("user", JSON.stringify(response.data.data[0]));
      router.push("/dashboard");
    } else {
      setError("Invalid Credentials! :(");
    }
  };

  const initialValues = {
    username: "",
    password: "",
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      router.replace("/dashboard");
    } else {
      router.replace("/");
    }
  }, []);

  return (
    <div className={styles.login_box + " p-3"}>
      <h1 className="display-6 mb-3">Login</h1>
      {error ? <Alert variant={"danger"}>{error}</Alert> : ""}
      <Formik
        validationSchema={userValidationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          touched,
          isSubmitting,
          values,
          handleChange,
          handleSubmit,
        }) => (
          <Form noValidate onSubmit={handleSubmit} className="text-left">
            <Form.Group controlId="username">
              <Form.Label>Your Email </Form.Label>
              <Form.Control
                required
                autoComplete="email"
                type="email"
                placeholder="john.doe@domain.com"
                value={values.username}
                onChange={handleChange}
                isValid={touched.username && !errors.username}
                isInvalid={touched.username && errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Your Password</Form.Label>
              <Form.Control
                required
                type="password"
                autoComplete="current-password"
                onChange={handleChange}
                isValid={touched.password && !errors.password}
                isInvalid={touched.password && errors.password}
                placeholder="Password"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Button
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              type="submit"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

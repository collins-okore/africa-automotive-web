<Form
  onSubmit={(e) => {
    e.preventDefault();
    validation.handleSubmit();
    return false;
  }}
  action="#"
>
  <div className="mb-3">
    <Label htmlFor="email" className="form-label">
      Email
    </Label>
    <Input
      name="email"
      className="form-control"
      placeholder="Enter email"
      type="email"
      onChange={validation.handleChange}
      onBlur={validation.handleBlur}
      value={validation.values.email || ""}
      invalid={
        validation.touched.email && validation.errors.email ? true : false
      }
    />
    {validation.touched.email && validation.errors.email ? (
      <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
    ) : null}
  </div>

  <div className="mb-3">
    <div className="float-end">
      <Link to="/forgot-password" className="text-muted">
        Forgot password?
      </Link>
    </div>
    <Label className="form-label" htmlFor="password-input">
      Password
    </Label>
    <div className="position-relative auth-pass-inputgroup mb-3">
      <Input
        name="password"
        value={validation.values.password || ""}
        type={passwordShow ? "text" : "password"}
        className="form-control pe-5"
        placeholder="Enter Password"
        onChange={validation.handleChange}
        onBlur={validation.handleBlur}
        invalid={
          validation.touched.password && validation.errors.password
            ? true
            : false
        }
      />
      {validation.touched.password && validation.errors.password ? (
        <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
      ) : null}
      <button
        className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
        type="button"
        id="password-addon"
        onClick={() => setPasswordShow(!passwordShow)}
      >
        <i className="ri-eye-fill align-middle"></i>
      </button>
    </div>
  </div>

  <div className="form-check">
    <Input
      className="form-check-input"
      type="checkbox"
      value=""
      id="auth-remember-check"
    />
    <Label className="form-check-label" htmlFor="auth-remember-check">
      Remember me
    </Label>
  </div>

  <div className="mt-4">
    <Button
      color="secondary"
      disabled={error ? null : loading ? true : false}
      className="w-100"
      type="submit"
    >
      {loading ? (
        <Spinner size="sm" className="me-2">
          {" "}
          Loading...{" "}
        </Spinner>
      ) : null}
      Sign In
    </Button>
  </div>

  <div className="mt-4 text-center">
    <div className="signin-other-title">
      <h5 className="fs-13 mb-4 title">Sign In with</h5>
    </div>
    <div>
      <Link
        to="#"
        className="btn btn-primary btn-icon me-1"
        onClick={(e) => {
          e.preventDefault();
          socialResponse("facebook");
        }}
      >
        <i className="ri-facebook-fill fs-16" />
      </Link>
      <Link
        to="#"
        className="btn btn-danger btn-icon me-1"
        onClick={(e) => {
          e.preventDefault();
          socialResponse("google");
        }}
      >
        <i className="ri-google-fill fs-16" />
      </Link>
      <Button color="dark" className="btn-icon">
        <i className="ri-github-fill fs-16"></i>
      </Button>{" "}
      <Button color="info" className="btn-icon">
        <i className="ri-twitter-fill fs-16"></i>
      </Button>
    </div>
  </div>
</Form>;

<CardBody className="p-4">
  <div className="text-center mt-2">
    <h5 className="text-primary">Welcome Back !</h5>
    <p className="text-muted">Sign in to continue to Velzon.</p>
  </div>
  {error && error ? <Alert color="danger"> {error} </Alert> : null}
  <div className="p-2 mt-4">
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
      }}
      action="#"
    >
      <div className="mb-3">
        <Label htmlFor="email" className="form-label">
          Email
        </Label>
        <Input
          name="email"
          className="form-control"
          placeholder="Enter email"
          type="email"
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.email || ""}
          invalid={
            validation.touched.email && validation.errors.email ? true : false
          }
        />
        {validation.touched.email && validation.errors.email ? (
          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
        ) : null}
      </div>

      <div className="mb-3">
        <div className="float-end">
          <Link to="/forgot-password" className="text-muted">
            Forgot password?
          </Link>
        </div>
        <Label className="form-label" htmlFor="password-input">
          Password
        </Label>
        <div className="position-relative auth-pass-inputgroup mb-3">
          <Input
            name="password"
            value={validation.values.password || ""}
            type={passwordShow ? "text" : "password"}
            className="form-control pe-5"
            placeholder="Enter Password"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            invalid={
              validation.touched.password && validation.errors.password
                ? true
                : false
            }
          />
          {validation.touched.password && validation.errors.password ? (
            <FormFeedback type="invalid">
              {validation.errors.password}
            </FormFeedback>
          ) : null}
          <button
            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
            type="button"
            id="password-addon"
            onClick={() => setPasswordShow(!passwordShow)}
          >
            <i className="ri-eye-fill align-middle"></i>
          </button>
        </div>
      </div>

      <div className="form-check">
        <Input
          className="form-check-input"
          type="checkbox"
          value=""
          id="auth-remember-check"
        />
        <Label className="form-check-label" htmlFor="auth-remember-check">
          Remember me
        </Label>
      </div>

      <div className="mt-4">
        <Button
          color="secondary"
          disabled={error ? null : loading ? true : false}
          className="w-100"
          type="submit"
        >
          {loading ? (
            <Spinner size="sm" className="me-2">
              {" "}
              Loading...{" "}
            </Spinner>
          ) : null}
          Sign In
        </Button>
      </div>

      <div className="mt-4 text-center">
        <div className="signin-other-title">
          <h5 className="fs-13 mb-4 title">Sign In with</h5>
        </div>
        <div>
          <Link
            to="#"
            className="btn btn-primary btn-icon me-1"
            onClick={(e) => {
              e.preventDefault();
              socialResponse("facebook");
            }}
          >
            <i className="ri-facebook-fill fs-16" />
          </Link>
          <Link
            to="#"
            className="btn btn-danger btn-icon me-1"
            onClick={(e) => {
              e.preventDefault();
              socialResponse("google");
            }}
          >
            <i className="ri-google-fill fs-16" />
          </Link>
          <Button color="dark" className="btn-icon">
            <i className="ri-github-fill fs-16"></i>
          </Button>{" "}
          <Button color="info" className="btn-icon">
            <i className="ri-twitter-fill fs-16"></i>
          </Button>
        </div>
      </div>
    </Form>
  </div>
</CardBody>;

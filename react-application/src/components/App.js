import React from 'react';

const Login = () => (
  <div className="page login">
    <div className="container">
      <form className="form-signin" method="post" action="login">
        <h2 className="form-signin-heading" style={{ textTransform: 'none' }}>Bienvenido a Mi IAPOS</h2>
        <label htmlFor="inputDocument">Número de Documento</label>
        <input type="text" name="identification" id="inputDocument" className="form-control" placeholder="Número de Documento" required />
        <label htmlFor="inputDocument">Contraseña</label>
        <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Contraseña" required />
        <button type="submit" className="btn btn-lg btn-primary btn-block">Iniciar Sesión</button>
        <a className="btn btn-lg btn-primary btn-block" href="/">Registrarse</a>
        <hr />
        <a href="/">Olvidé mi Contraseña</a>
      </form>
    </div>
  </div>
);

Login.defaultProps = {};

export default Login;

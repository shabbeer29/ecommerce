export default function Login() {
    return (
        <>
            <h1>Login</h1>
            <form method="post">
                <div className="form-group">
                    <label htmlFor="email">Username</label>
                    <input type="text" className="form-control" id="username" name="username"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </>
    )
}
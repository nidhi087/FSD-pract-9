import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

        try {
            const res = await fetch(`http://localhost:5000${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            setIsLoading(false);
            if (res.ok) {
                localStorage.setItem('isAuthenticated', 'true');
                // Save JWT token so protected API calls (checkout, upload) work
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }
                alert(`${isLogin ? "Login" : "Registration"} successful!`);
                window.location.href = "/";
            } else {
                if (data.errors) {
                    alert(data.errors.map(err => err.msg).join("\n"));
                } else {
                    alert(data.message || "Authentication failed");
                }
            }
        } catch (err) {
            console.error(err);
            setIsLoading(false);
            alert("Error connecting to server.");
        }
    };

    const handleGoogleSignIn = () => {
        const windowFeatures = "left=100,top=100,width=450,height=550";
        const popup = window.open("", "_blank", windowFeatures);

        if (popup) {
            const htmlContent = `
                <html>
                <head>
                    <title>Sign in - Google Accounts</title>
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; display: flex; justify-content: center; height: 100vh; margin: 0; background-color: #fff; }
                        .box { padding: 40px 30px; border: 1px solid #dadce0; border-radius: 8px; width: 380px; text-align: center; margin-top: 40px; box-sizing: border-box; }
                        .account { display: flex; align-items: center; padding: 12px; border-top: 1px solid #dadce0; cursor: pointer; text-align: left; }
                        .account:hover { background: #f8f9fa; }
                        .account:last-child { border-bottom: 1px solid #dadce0; }
                        .avatar { width: 32px; height: 32px; border-radius: 50%; background: #1a73e8; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; }
                        .email { flex-grow: 1; }
                        .email-name { font-weight: 600; color: #3c4043; font-size: 14px; margin-bottom: 2px; }
                        .email-address { color: #5f6368; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="box">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" width="75" alt="Google" style="margin-bottom: 10px;">
                        <h2 style="margin:0 0 10px; font-weight: 400; font-size: 24px;">Choose an account</h2>
                        <p style="margin: 0 0 30px; font-size: 16px;">to continue to E-Shop Luxe</p>
                        
                        <div class="account" onclick="window.opener.postMessage({type:'google_success', name:'Nidhi Tak', email:'nidhi.tak@gmail.com'}, '*'); window.close();">
                            <div class="avatar">N</div>
                            <div class="email">
                                <div class="email-name">Nidhi Tak</div>
                                <div class="email-address">nidhi.tak@gmail.com</div>
                            </div>
                        </div>
                        <div class="account" onclick="window.opener.postMessage({type:'google_success', name:'Test User', email:'testuser@gmail.com'}, '*'); window.close();">
                            <div class="avatar" style="background:#0f9d58;">T</div>
                            <div class="email">
                                <div class="email-name">Test User</div>
                                <div class="email-address">testuser@gmail.com</div>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `;
            popup.document.write(htmlContent);

            // Listen for the message from the popup
            const handleMessage = async (event) => {
                if (event.data && event.data.type === 'google_success') {
                    window.removeEventListener('message', handleMessage);
                    const { name, email } = event.data;
                    const googlePassword = "Google@" + email; // deterministic password for Google users

                    try {
                        // Try to register first (will fail silently if user already exists)
                        await fetch("http://localhost:5000/api/auth/register", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ name, email, password: googlePassword })
                        });

                        // Now login to get a real JWT token
                        const loginRes = await fetch("http://localhost:5000/api/auth/login", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ email, password: googlePassword })
                        });
                        const loginData = await loginRes.json();

                        if (loginRes.ok && loginData.token) {
                            localStorage.setItem('isAuthenticated', 'true');
                            localStorage.setItem('token', loginData.token);
                            alert("Successfully signed in with Google!");
                            window.location.href = "/";
                        } else {
                            alert(loginData.message || "Google sign-in failed. Please try email login.");
                        }
                    } catch (err) {
                        console.error("Google sign-in backend error:", err);
                        alert("Error connecting to server during Google sign-in.");
                    }
                }
            };
            window.addEventListener('message', handleMessage);
        }
    };

    return (
        <div className="login-container flex-container" style={{ justifyContent: "center", marginTop: "40px" }}>
            <div className="auth-form glass-effect" style={{ padding: "40px", maxWidth: "450px", width: "100%" }}>
                <h2 style={{ textAlign: "center", marginBottom: "25px" }}>{isLogin ? "Welcome Back" : "Create Account"}</h2>

                <form onSubmit={handleEmailAuth}>
                    {!isLogin && (
                        <div className="form-group mb-3">
                            <label>Full Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="John Doe" required={!isLogin} />
                        </div>
                    )}
                    <div className="form-group mb-3">
                        <label>Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="email@example.com" required />
                    </div>
                    <div className="form-group mb-4">
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" placeholder="••••••••" required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={isLoading} style={{ padding: "12px" }}>
                        {isLoading ? "Processing..." : (isLogin ? "Sign In with Email" : "Sign Up with Email")}
                    </button>
                </form>

                <div className="divider" style={{ margin: "25px 0", textAlign: "center", position: "relative" }}>
                    <span style={{ background: "transparent", color: "var(--light-gray)", position: "relative", zIndex: 1, padding: "0 10px" }}>OR</span>
                    <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "rgba(255, 255, 255, 0.1)", zIndex: 0 }}></div>
                </div>

                <button onClick={handleGoogleSignIn} className="btn w-100 flex-container" style={{ padding: "12px", background: "white", color: "#333", border: "1px solid #ccc", justifyContent: "center", gap: "10px", fontWeight: "bold" }}>
                    <svg viewBox="0 0 48 48" width="20px" height="20px">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    </svg>
                    Continue with Google
                </button>

                <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "var(--light-gray)" }}>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <span onClick={() => setIsLogin(!isLogin)} style={{ color: "var(--primary-color)", cursor: "pointer", fontWeight: "bold" }}>
                        {isLogin ? "Sign Up" : "Log In"}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;

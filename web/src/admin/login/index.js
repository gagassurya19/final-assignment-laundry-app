import React from "react";

export default class Login extends React.Component{
    render(){
        return(
            <>
                <form action="post">
                    <input type="text" placeholder="Username"/>
                    <input type="password" placeholder="Password"/>
                    <label>Role:</label>
                    <select>
                        <option value="admin">admin</option>
                        <option value="kasir">kasir</option>
                        <option value="owner">owner</option>
                    </select>
                    <button type="submit">login</button>
                </form>
            </>
        )
    }
}

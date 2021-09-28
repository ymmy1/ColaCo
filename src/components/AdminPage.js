import React from 'react'


import '../styles/AdminPage.css';

function AdminPage(props) {



    return (
        <div id="adminpage">
            <nav>
                <span>CocaCo</span>
                <button onClick={() => props.switchStep("home")}>Home</button>
            </nav>
            <div className="warning-text">
                This app only works on screens 933px wide and higher
            </div>
            <section>
                <h1>
                    Admin Panel
                </h1>
                <div className="total">
                    <p> <b>Total Profit:</b>  <em> Comming Soon</em></p>
                    <p><b>Total Sells:</b><em> Comming Soon</em></p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Soda</th>
                            <th>Price</th>
                            <th>In Stock</th>
                            <th>Restock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.items.map((soda, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="soda_box" style={{ background: soda.Bg }} >
                                        <img src={`${process.env.PUBLIC_URL}/assets/${soda.Src}`} alt={soda.Name} key={soda.Name} />
                                        <div>
                                            <p className="description">{soda.Description}</p>
                                            <p className="price">${soda.Cost}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="cost">
                                    <form onSubmit={props.handleCostUpdate} >
                                        <label htmlFor="cost">$</label>
                                        <input type="text" data-sodaid={soda.id} data-sodaindex={index} name="cost" placeholder={soda.Cost} />
                                        <input type="submit" value="Update" />
                                    </form>
                                </td>
                                <td className="instock">
                                    <span>{soda.Available_qty}</span>
                                </td>
                                <td className="restock">
                                    <form onSubmit={props.handleRestockUpdate} >
                                        <input type="text" data-sodaid={soda.id} data-sodaindex={index} name="restock" placeholder="0" />
                                        <input type="submit" value="Add" />
                                    </form>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                <div className="soda_box" style={{ background: "#f0f0f0" }} >
                                    <div className="plusSign">
                                        <img className="plusLogo" src="https://png2.cleanpng.com/sh/f4b742b60208e514b05bd30d202ed54e/L0KzQYq4UMI2N51niZH9cnHxg8HokvVvfF5mfNY2aXPyfn73jQV0NZpoh9C2NXTlQ7W8VcI6OmU7T6s3OEa0R4K3UMUyPWg3SKgBNkS1RYqCUr5xdpg=/transparent-add-icon-plus-icon-5db3d552924679.8617100515720666425992.png" alt="add button" />
                                        <p>Coming soon</p>
                                    </div>
                                </div>
                            </td>
                            <td>Coming soon</td>
                            <td>Coming soon</td>
                            <td>Coming soon</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default AdminPage

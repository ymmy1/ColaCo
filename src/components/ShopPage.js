import React from 'react';

import CoinSound from '../audio/coin.mp3';
import CompleteSound from '../audio/complete.mp3';
import Sound from '../audio/sound.mp3';
import VmImg from '../img/vm.png';
import '../styles/ShopPage.css';


function ShopPage(props) {
    return (
        <div id="shoppage">
            <nav>
                <span>CocaCo</span>
                <button onClick={() => props.switchStep("home")}>Home</button>
            </nav>
            <div className="warning-text">
                This app only works on screens 933px wide and higher
            </div>
            <section>
                <div className="cash">
                    <span>Cash: ${props.cash.toFixed(2)}</span>
                    <button onClick={props.deposit}>Deposit +$5</button>
                    <audio id="coinAudio-element" className="audio-element">
                        <source src={CoinSound}></source>
                    </audio>
                </div>
                <div className="main">
                    <img className="vengindImg" src={VmImg} alt="Vending Machine" />
                    <div className="action">
                        <div className="soda_buttons">
                            <audio id="audio-element" className="audio-element">
                                <source src={Sound}></source>
                            </audio>
                            {props.items.map((soda, index) => (
                                <div className="soda_box" style={{ background: soda.Bg }} key={index} onClick={() => props.handleSelect(index)}>
                                    <img src={`${process.env.PUBLIC_URL}/assets/${soda.Src}`} alt={soda.Name} key={soda.Name} />
                                    <div>
                                        <p className="description">{soda.Description}</p>
                                        <p className="price">${soda.Cost}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="cart">
                            <div className="display">
                                ${props.total.toFixed(2)}
                            </div>
                            <div className="tray">
                                {props.cart.map((soda, index) => (
                                    <div className="selection" key={index}>
                                        <img src={`${process.env.PUBLIC_URL}/assets/${soda.Src}`} alt={soda.Name} key={soda.Name} />
                                        <div className="title">
                                            {soda.Name} x {soda.Qty}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <audio id="completeAudio-element">
                            <source src={CompleteSound}></source>
                        </audio>
                        <button id="Buy" onClick={() => props.buy()} >
                            Buy
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ShopPage
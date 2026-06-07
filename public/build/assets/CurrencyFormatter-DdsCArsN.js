function n({amount:r,currency:e="USD",locale:t="en-US"}){return new Intl.NumberFormat(t,{style:"currency",currency:e}).format(r)}export{n as C};

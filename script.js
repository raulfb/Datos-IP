let apiKey = "ApiKey";
 
window.oRTCPeerConnection =
  window.oRTCPeerConnection || window.RTCPeerConnection;
 
window.RTCPeerConnection = function (...args) {
  const pc = new window.oRTCPeerConnection(...args);
 
  pc.oaddIceCandidate = pc.addIceCandidate;
 
  pc.addIceCandidate = function (iceCandidate, ...rest) {
    const fields = iceCandidate.candidate.split(" ");
 
    console.log(iceCandidate.candidate);
    const ip = fields[4];
    if (fields[7] === "srflx") {
      getDatosUsuario(ip);
    }
    return pc.oaddIceCandidate(iceCandidate, ...rest);
  };
  return pc;
};
 
let getDatosUsuario = async (ip) => {
  let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`;
 
  await fetch(url).then((response) =>
    response.json().then((json) => {
      const output = `
          ---------------------
	  Ip: ${ip}
	  Continente: ${json.continent_name}
          Pais: ${json.country_name}
          Provincia: ${json.state_prov}
          Ciudad: ${json.city}
          Provedor de servicios: ${json.isp}
          Coordenadas: (${json.latitude}, ${json.longitude})
          ---------------------
          `;
      console.log(output);
    })
  );
};

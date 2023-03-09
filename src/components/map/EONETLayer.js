import {Marker, Popup} from "react-leaflet";

const EONETLayer = (props) => {
    const data = props.data;
    const plottableData = []
    for (const entry of data) {
        if (entry.latitudinal != null && entry.longitudinal != null) {
            plottableData.push(entry)
        }
    }

    const renderListOfDisasters = (disasters) => {
        return disasters.map(disaster => (
            <div key={disaster.id}>
                <Marker position={[disaster.latitudinal, disaster.longitudinal]}>
                    <Popup>
                        {disaster.name}
                    </Popup>
                </Marker>
            </div>
        ))
    };

    return (
        renderListOfDisasters(plottableData)
    );
}

export default EONETLayer;
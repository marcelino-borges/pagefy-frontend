import { v4 as uuid } from "uuid";
import { ResponsiveMap } from "./style";

interface IMapIFrameProps {
  mapUrl: string;
  width?: string;
  height?: string;
}

const MapEmbed = ({ mapUrl, width, height }: IMapIFrameProps) => {
  return (
    <ResponsiveMap
      style={{
        paddingBottom: !width && !height ? "56.25%" : "unset",
        width: width ? width.replaceAll("px", "") + "px" : "unset",
        height: height ? height.replaceAll("px", "") + "px" : "unset",
      }}
    >
      <iframe
        title={uuid()}
        src={mapUrl}
        width={width ? width.replaceAll("px", "") + "px" : "853"}
        height={height ? height.replaceAll("px", "") + "px" : "480"}
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </ResponsiveMap>
  );
};

export default MapEmbed;

import { v4 as uuid } from "uuid";
import { ResponsiveMap } from "./style";

interface IMapIFrameProps {
  mapUrl: string;
  width?: string;
  height?: string;
}

const MapEmbed = ({ mapUrl, width, height }: IMapIFrameProps) => {
  const getGoogleMapsURLToEmbed = (url: string) => {
    var coords = /@([0-9.,\-a-zA-Z]*)/.exec(url);
    if (coords != null) {
      var coordsArray = coords[1].split(",");
      return (
        "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d20000!2d" +
        coordsArray[1] +
        "!3d" +
        coordsArray[0] +
        "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1486486434098"
      );
    }
  };

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
        src={getGoogleMapsURLToEmbed(mapUrl)}
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

import { useCallback, useEffect, useState } from "react";
import SketchPicker from "react-color/lib/components/sketch/Sketch";
import strings from "../../../localization";
import { ColorPickerSpan, Group, SubmitButton } from "./styles";

interface IColorPickerProps {
  color: any;
  onChangeComplete: any;
}

const ColorPicker = ({
  color: originalColor,
  onChangeComplete,
}: IColorPickerProps) => {
  const [currentColor, setCurrentColor] = useState();

  const escFunction = useCallback((event: any) => {
    if (event.keyCode === 27) {
      handleCancel();
    }
    setCurrentColor(originalColor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction);

    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [escFunction]);

  const handleChangeComplete = (color: any) => {
    setCurrentColor(color);
  };

  const handleCancel = () => {
    onSubmitColor(originalColor);
  };

  const onSubmitColor = (color: any) => {
    onChangeComplete(color);
    setCurrentColor(color);
  };

  return (
    <ColorPickerSpan
      onClick={(event: any) => {
        event.preventDefault();
      }}
    >
      <SketchPicker
        color={currentColor}
        onChangeComplete={(color: any) => {
          handleChangeComplete(color);
        }}
      />
      <Group>
        <SubmitButton onClick={handleCancel}>{strings.cancel}</SubmitButton>
        <SubmitButton
          onClick={() => {
            onSubmitColor(currentColor);
          }}
        >
          {strings.save}
        </SubmitButton>
      </Group>
    </ColorPickerSpan>
  );
};

export default ColorPicker;

import { useCallback, useEffect, useState } from "react";
import SketchPicker from "react-color/lib/components/sketch/Sketch";
import strings from "../../../localization";
import { ColorPickerSpan, Container, Group, SubmitButton } from "./styles";

interface IColorPickerProps {
  initialColor: any;
  onChangeComplete: any;
  onCancel: () => void;
  id?: string;
}

const ColorPicker = ({
  initialColor,
  onChangeComplete,
  onCancel,
  id,
}: IColorPickerProps) => {
  const [currentColor, setCurrentColor] = useState();

  const escFunction = useCallback((event: any) => {
    if (event.keyCode === 27) {
      onCancel();
    }
    setCurrentColor(initialColor);
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

  const onSubmitColor = (color: any) => {
    onChangeComplete(color);
    setCurrentColor(color);
  };

  return (
    <ColorPickerSpan
      onClick={(event: any) => {
        event.preventDefault();
      }}
      id={id}
    >
      <Container>
        <SketchPicker
          color={currentColor}
          onChangeComplete={(color: any) => {
            handleChangeComplete(color);
          }}
        />
        <Group>
          <SubmitButton onClick={onCancel}>{strings.cancel}</SubmitButton>
          <SubmitButton
            onClick={() => {
              onSubmitColor(currentColor);
            }}
          >
            {strings.save}
          </SubmitButton>
        </Group>
      </Container>
    </ColorPickerSpan>
  );
};

export default ColorPicker;

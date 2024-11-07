import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";

interface SliderProps {
  maxDefault?: number;
  disabled?: boolean;
  sliderValue: number;
  setSliderValue: (i: number) => void;
  isSliderDisabled: boolean;
  setIsSliderDisabled: (i: boolean) => void;
}

const Container = styled.div`
  display: flex;
  position: fixed;
  right: 10px;
  top: 70%;
  flex-direction: column;
  align-self: flex-end;
  max-width: 300px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #f8f9fa;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  margin-bottom: 15px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }

  &:disabled {
    background-color: #e9ecef;
    color: #6c757d;
    cursor: not-allowed;
  }
`;

const RangeSlider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  background: #dee2e6;
  border-radius: 5px;
  outline: none;
  transition: background-color 0.3s;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #007bff;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  &:hover {
    background-color: #ced4da;
  }

  &:disabled {
    background-color: #e9ecef;
    cursor: not-allowed;
  }

  &:disabled::-webkit-slider-thumb {
    background-color: #6c757d;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 5px;
  display: flex;
  justify-content: flex-end;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #495057;
`;

const ValueDisplay = styled.div`
  margin-top: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
  color: #343a40;
`;

const AdjustableSlider: React.FC<SliderProps> = ({
  maxDefault = 1000000,
  sliderValue = 100,
  setSliderValue,
  isSliderDisabled = false,
  setIsSliderDisabled,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [maxValue, setMaxValue] = useState<number>(maxDefault);
  const [showMaxInput, setShowMaxInput] = useState<boolean>(false);

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(100, Number(event.target.value) || maxDefault);
    setMaxValue(newMax);
    if (sliderValue > newMax) setSliderValue(newMax);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(event.target.value));
  };

  const handleCheckboxChange = () => setIsSliderDisabled(!isSliderDisabled);

  const toggleHide = () => setShow(!show);
  const toggleMaxInput = () => setShowMaxInput(!showMaxInput);

  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        {show && (
            <CheckboxLabel>
              <input
                type="checkbox"
                checked={!isSliderDisabled}
                onChange={handleCheckboxChange}
              />
            </CheckboxLabel>
        )}
        {!showMaxInput && (
          <ToggleButton onClick={toggleHide}>
            {show ? (
              <FontAwesomeIcon icon={"arrow-alt-circle-right"} />
            ) : (
              <div style={{ justifyContent: "space-evenly" }}>
                <span style={{ marginRight: "4px" }}>Filtro R$</span>
                <FontAwesomeIcon icon={"arrow-alt-circle-left"} />
              </div>
            )}
          </ToggleButton>
        )}
        {show && (
          <ToggleButton onClick={toggleMaxInput}>
            {showMaxInput ? (
              <FontAwesomeIcon icon={"check-circle"} />
            ) : (
              <FontAwesomeIcon icon={"edit"} />
            )}
          </ToggleButton>
        )}
      </div>

      {showMaxInput && (
        <>
          <Input
            type="number"
            value={maxValue}
            onChange={handleMaxChange}
            disabled={isSliderDisabled}
          />
        </>
      )}
      {show && (
        <>
          <RangeSlider
            type="range"
            min={1}
            max={maxValue}
            value={sliderValue}
            onChange={handleSliderChange}
            disabled={isSliderDisabled}
          />

          <ValueDisplay>
            <strong>R$ {sliderValue}</strong>
          </ValueDisplay>
        </>
      )}
    </Container>
  );
};

export default AdjustableSlider;

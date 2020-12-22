import React from 'react';
import styled from 'styled-components';

interface SwitchInputProps {
  id: string;
  isOn: boolean;
  label?: string;
  onToggle: () => void;
}

const SwitchInput: React.FC<SwitchInputProps> = ({
  isOn,
  onToggle,
  label,
  id,
}) => {
  return (
    <Container>
      <HiddenInput
        checked={isOn}
        onChange={onToggle}
        className="switch-checkbox"
        id={id}
        type="checkbox"
      />
      <SwitchContainer disabled={!isOn} className="switch-label" htmlFor={id}>
        <SwitchButton className="switch-button" />
      </SwitchContainer>
      {label && <Label htmlFor={id}>{label}</Label>}
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  font-size: 1.8rem;
  justify-content: flex-start;
  margin-bottom: 2.8rem;
`;

const Label = styled.label`
  cursor: pointer;
  margin-left: 2.1rem;
`;

const HiddenInput = styled.input`
  height: 0;
  display: none;
  width: 0;

  &:checked + .switch-label .switch-button {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }
`;

interface SwitchContainerProps {
  disabled: boolean;
}

const SwitchContainer = styled.label<SwitchContainerProps>`
  align-items: center;
  background-color: var(
    ${(props) => (props.disabled ? '--color-grey-light-4' : '--color-primary')}
  );
  border-radius: 10rem;
  cursor: pointer;
  display: flex;
  height: 3.2rem;
  justify-content: space-between;
  position: relative;
  transition: background-color 0.1s;
  width: 6rem;

  .switch-button {
    background: var(--color-white);
    border-radius: 2.7rem;
    box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
    content: '';
    height: 2.7rem;
    left: 2px;
    position: absolute;
    top: 2px;
    transition: 0.1s;
    width: 2.7rem;
  }
`;

const SwitchButton = styled.span``;

export default SwitchInput;

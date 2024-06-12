import type {
  PortalStylesTypeColors,
  PortalStylesType,
} from "../portal/portal-styles";
import { useTranslation } from "react-i18next";
import {
  FormGroup,
  Flex,
  FlexItem,
  FormHelperText,
  HelperText,
  HelperTextItem,
} from "@patternfly/react-core";
import { HelpItem, TextControl } from "ui-shared";
import { ValidatedOptions } from "@patternfly/react-core/dist/js/helpers/constants";
import type {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { ColorPicker } from "./ColorPicker";

const HexColorPattern = "^#([0-9a-f]{3}){1,2}$";

type ColorFormGroupProps = {
  colorKey: keyof PortalStylesTypeColors;
  errors: FieldErrors<PortalStylesType>;
  getValues: UseFormGetValues<PortalStylesType>;
  setValue: UseFormSetValue<PortalStylesType>;
  register: UseFormRegister<PortalStylesType>;
};

const ColorFormGroup: React.FC<ColorFormGroupProps> = ({
  colorKey,
  errors,
  getValues,
  setValue,
  register,
}) => {
  const { t } = useTranslation();
  return (
    <FormGroup
      labelIcon={
        <HelpItem
          helpText={t(`styles:${colorKey}Help`)}
          fieldLabelId={colorKey}
        />
      }
      label={t(colorKey)}
      fieldId={`kc-styles-${colorKey}-url`}
    >
      <Flex alignItems={{ default: "alignItemsCenter" }}>
        <FlexItem>
          <ColorPicker
            color={getValues(colorKey)}
            onChange={(color) => setValue(colorKey, color)}
          />
        </FlexItem>
        <FlexItem grow={{ default: "grow" }}>
          <TextControl
            type="text"
            id={`kc-styles-${colorKey}-url`}
            name={`kc-styles-${colorKey}-url`}
            label=""
            data-testid={`kc-styles-${colorKey}-url`}
            pattern={HexColorPattern}
            rules={{ required: true }}
            validated={
              errors[colorKey]
                ? ValidatedOptions.error
                : ValidatedOptions.default
            }
          />
          {errors[colorKey] && (
            <FormHelperText>
              <HelperText>
                <HelperTextItem variant={ValidatedOptions.error}>
                  {t(`styles:colorHelpInvalid`)}
                </HelperTextItem>
              </HelperText>
            </FormHelperText>
          )}
        </FlexItem>
      </Flex>
    </FormGroup>
  );
};

export default ColorFormGroup;

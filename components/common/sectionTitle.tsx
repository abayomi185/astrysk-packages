import { styled, H3 } from "tamagui";

export const SectionTitle = styled(H3, {
  paddingVertical: "$2",
  paddingHorizontal: "$3",
  variants: {
    subtle: {
      true: {
        color: "$gray11",
      },
    },
  },
});

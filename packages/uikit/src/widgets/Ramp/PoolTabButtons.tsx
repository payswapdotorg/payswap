import { useRouter } from "next/router";
import styled from "styled-components";
import { useTranslation } from "@pancakeswap/localization";
import {
  ButtonMenu,
  ButtonMenuItem,
  Toggle,
  Text,
  NotificationDot,
  NextLinkFromReactRouter,
  LinkExternal,
} from "../../components";
import { ToggleView, ViewMode } from "../../components/ToggleView";

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`;

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    padding-left: 12px;
    padding-right: 12px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 16px;
  }
`;

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`;

interface PoolTableButtonsPropsType {
  stakedOnly: boolean;
  setStakedOnly: (s: boolean) => void;
  favoritesOnly: boolean;
  setFavoritesOnly: (s: boolean) => void;
  viewMode: ViewMode;
  setViewMode: (s: ViewMode) => void;
  hasStakeInFinishedPools: boolean;
}

const PoolTabButtons = ({ stakedOnly, setStakedOnly, favoritesOnly, setFavoritesOnly, viewMode, setViewMode }: any) => {
  const router = useRouter();

  const { t } = useTranslation();

  const viewModeToggle = <ToggleView idPrefix="clickPool" viewMode={viewMode} onToggle={setViewMode} />;

  const liveOrFinishedSwitch = (
    <Wrapper>
      <ButtonMenu activeIndex={!router.asPath.includes("under") ? 0 : 1} scale="sm" variant="subtle">
        <ButtonMenuItem as={NextLinkFromReactRouter} to={`/ramps/${router.query.ramp}`} replace>
          {t("Over")}
        </ButtonMenuItem>
        <ButtonMenuItem as={NextLinkFromReactRouter} to={`/ramps/${router.query.ramp}?under`} replace>
          {t("Under")}
        </ButtonMenuItem>
        <StyledLinkExternal href={`/trustbounties`}>{t("Bounties")}</StyledLinkExternal>
      </ButtonMenu>
    </Wrapper>
  );

  const stakedOnlySwitch = (
    <ToggleWrapper>
      <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="sm" />
      <Text> {t("Mine only")}</Text>
    </ToggleWrapper>
  );

  const favoritesOnlySwitch = (
    <ToggleWrapper>
      <Toggle checked={favoritesOnly} onChange={() => setFavoritesOnly(!favoritesOnly)} scale="sm" />
      <Text> {t("Favorites")}</Text>
    </ToggleWrapper>
  );

  return (
    <ViewControls>
      {/* {viewModeToggle} */}
      {/* {stakedOnlySwitch} */}
      {favoritesOnlySwitch}
      {liveOrFinishedSwitch}
    </ViewControls>
  );
};

export default PoolTabButtons;

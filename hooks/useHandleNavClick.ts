import { ROUTES } from "@/constants/routes";
import { usePickDropdownStore, useTechblogDropdownStore } from "@stores/dropdownStore";
import { useLoginStatusStore } from "@stores/loginStore";
import { useLoginModalStore } from "@stores/modalStore";
import { useCompanyIdStore, useSearchKeywordStore } from "@stores/techBlogStore";
import { useUserInfoStore } from "@stores/userInfoStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";


const useHandleLinkClick = () => {
const queryClient = useQueryClient();

  const { userInfo } = useUserInfoStore();
  const { setLoginStatus, setLogoutStatus } = useLoginStatusStore();
  const { setSearchKeyword } = useSearchKeywordStore();
  const { setCompanyId } = useCompanyIdStore();
  const { setSort: setPickSort } = usePickDropdownStore();
  const { setSort: setTechblogSort } = useTechblogDropdownStore();

  useEffect(() => {
    if (userInfo?.accessToken) {
      setLoginStatus();
    } else {
      setLogoutStatus();
    }
  }, [userInfo, setLoginStatus, setLogoutStatus]);

  const invalidPickQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['pickData'] });
    setPickSort('POPULAR');
  };

  const refreshTechArticleParams = () => {
    setSearchKeyword('');
    setCompanyId(null);
    queryClient.invalidateQueries({ queryKey: ['techBlogData'] });
    setTechblogSort('LATEST');
  };

  const handleLinkClick = (link: string) => {
    if (link === ROUTES.PICKPICKPICK.MAIN) {
      invalidPickQuery();
    } else if (link === ROUTES.TECH_BLOG) {
      refreshTechArticleParams();
    }
  };

  return { handleLinkClick };
};

export default useHandleLinkClick;

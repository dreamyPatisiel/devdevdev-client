import { useQueryClient } from '@tanstack/react-query';

import { usePickDropdownStore, useTechblogDropdownStore } from '@stores/dropdownStore';
import { usePickSearchStore } from '@stores/pickSearchStore';
import { useCompanyInfoStore, useSearchKeywordStore } from '@stores/techBlogStore';

import { ROUTES } from '@/constants/routes';

const useHandleRefreshLinkClick = () => {
  const queryClient = useQueryClient();

  const { setSearchKeyword } = useSearchKeywordStore();
  const { resetCompanyInfo } = useCompanyInfoStore();
  const { setInitialSort: setPickInitialSort } = usePickDropdownStore();
  const { resetKeyword } = usePickSearchStore();
  const { setInitialSort: setTechblogInitailSort } = useTechblogDropdownStore();

  const invalidPickQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['pickData'] });
    setPickInitialSort();
    resetKeyword();
  };

  const refreshTechArticleParams = () => {
    setSearchKeyword('');
    resetCompanyInfo();
    queryClient.invalidateQueries({ queryKey: ['techBlogData'] });
    setTechblogInitailSort();
  };

  const refreshMyInfo = () => {
    queryClient.invalidateQueries({ queryKey: ['myCommentsData'] });
  };

  const handleRefreshLinkClick = (link: string) => {
    if (link === ROUTES.PICKPICKPICK.MAIN) {
      invalidPickQuery();
    } else if (link === ROUTES.TECH_BLOG) {
      refreshTechArticleParams();
    } else if (link.startsWith(ROUTES.MY_INFO.PREFIX)) {
      refreshMyInfo();
    }
  };

  return { handleRefreshLinkClick };
};

export default useHandleRefreshLinkClick;

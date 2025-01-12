import { useQueryClient } from '@tanstack/react-query';

import { usePickDropdownStore, useTechblogDropdownStore } from '@stores/dropdownStore';
import { useCompanyIdStore, useSearchKeywordStore } from '@stores/techBlogStore';

import { ROUTES } from '@/constants/routes';

const useHandleLinkClick = () => {
  const queryClient = useQueryClient();

  const { setSearchKeyword } = useSearchKeywordStore();
  const { setCompanyId } = useCompanyIdStore();
  const { setSort: setPickSort } = usePickDropdownStore();
  const { setSort: setTechblogSort } = useTechblogDropdownStore();

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

import Typography from '@mui/material/Typography';
import CreditsCard from './components/CreditsCard';
import ScrollWrapBox from '../../components/scrollGrid/ScrollWrapBox';
import ScrollGridContainer from '../../components/scrollGrid/ScrollGridContainer';
import TabLayout from '../../components/scrollGrid/TabLayout';
import { CreditType } from '../../types/creditType';
import PageGridItem from '../../components/pageGrid/PageGridItem';
interface CreditsPageProps {
  credits: CreditType[];
}

const CreditsPage = ({ credits }: CreditsPageProps) => {
  return (
    <TabLayout>
      <Typography variant="h5" fontWeight={500}>
        출연진
      </Typography>
      <ScrollWrapBox credit="credit">
        <ScrollGridContainer>
          {credits &&
            credits.slice(0, 20).map((creditItem) => (
              <PageGridItem
                key={creditItem.name}
                scrollcard="true"
                credit="credit"
              >
                <CreditsCard creditItem={creditItem} />
              </PageGridItem>
            ))}
        </ScrollGridContainer>
      </ScrollWrapBox>
    </TabLayout>
  );
};

export default CreditsPage;

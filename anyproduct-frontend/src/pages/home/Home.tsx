import BaseLayout from '../../components/layout/BaseLayout'

import Gallery from '../../components/gallery/Gallery'

export const Home = (): JSX.Element => {
  return (
    <BaseLayout>
      <h3>Unicorns in stock 🦄 </h3>
      <Gallery initialImages={[]} initialPage={1} />
    </BaseLayout>
  )
}
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { GRAPH_API_BUSINESS } from 'config/constants/endpoints'
import request, { gql } from 'graphql-request'
import _chunk from 'lodash/chunk'
// import { getCollectionApi } from 'state/cancan/helpers'
import { collectionFields } from './queries'

export const getCollectionSg = async (collectionId: string) => {
  try {
    const res = await request(
      GRAPH_API_BUSINESS,
      gql`
        query 
        getCollectionData($collectionId: String!) 
        {
          collection(id: $collectionId, where: { active: true }) {
            ${collectionFields}
          }
        }
      `,
      { collectionId },
    )
    // const [collection] = await Promise.all([getCollectionApi(collectionId)])
    const collection = []
    return {
      ...res.collection,
      ...collection,
    }
  } catch (error) {
    console.error('Failed ===========> to fetch business gauge', error)
    return null
  }
}

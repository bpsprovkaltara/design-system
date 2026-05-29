import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import {
  DescriptionDetails,
  DescriptionList,
  DescriptionListItem,
  DescriptionTerm,
} from './description-list'

describe('DescriptionList', () => {
  it('renders term and details', () => {
    render(
      <DescriptionList>
        <DescriptionListItem>
          <DescriptionTerm>Kode Wilayah</DescriptionTerm>
          <DescriptionDetails>65.71</DescriptionDetails>
        </DescriptionListItem>
      </DescriptionList>
    )

    expect(screen.getByText('Kode Wilayah')).toBeInTheDocument()
    expect(screen.getByText('65.71')).toBeInTheDocument()
  })
})

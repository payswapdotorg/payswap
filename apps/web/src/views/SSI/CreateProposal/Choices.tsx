import { Button, Card, CardBody, CardHeader, Heading } from '@pancakeswap/uikit'
import uniqueId from 'lodash/uniqueId'
import { useTranslation } from '@pancakeswap/localization'
import Choice from './Choice'

export interface Choice {
  id: string
  value: string
}

interface ChoicesProps {
  choices: Choice[]
  onChange: (newChoices: Choice[]) => void
}

export const MINIMUM_CHOICES = 2
export const makeChoice = (): Choice => ({ id: uniqueId(), value: '' })
export const makeChoices = (): Choice[] => [makeChoice(), makeChoice()]

const Choices: React.FC<React.PropsWithChildren<ChoicesProps>> = ({ choices, onChange }) => {
  const { t } = useTranslation()
  const hasMinimumChoices = choices.filter((choice) => choice.value.length > 0).length >= MINIMUM_CHOICES

  const addChoice = () => {
    onChange([...choices, ...makeChoices()])
  }

  return (
    <Card>
      <CardHeader>
        <Heading as="h3" scale="md">
          {t('Entries')}
        </Heading>
      </CardHeader>
      <CardBody>
        {choices.map(({ id, value }, index) => {
          const handleTextInput = (newValue: string) => {
            const newChoices = [...choices]
            const choiceIndex = newChoices.findIndex((newChoice) => newChoice.id === id)

            newChoices[choiceIndex].value = newValue

            onChange(newChoices)
          }

          const handleRemove = () => {
            onChange(
              choices.filter(
                (newPrevChoice) =>
                  newPrevChoice.id !== id && newPrevChoice.id !== choices[index % 2 === 0 ? index + 1 : index - 1].id,
              ),
            )
          }

          return (
            <Choice
              key={id}
              scale="lg"
              onTextInput={handleTextInput}
              placeholder={index % 2 === 0 ? t('Question') : t('Answer')}
              value={value}
              onRemove={index > 1 ? handleRemove : undefined}
            />
          )
        })}

        <Button type="button" onClick={addChoice} disabled={!hasMinimumChoices}>
          {t('Add Entry')}
        </Button>
      </CardBody>
    </Card>
  )
}

export default Choices

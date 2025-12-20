import type { Reference } from '../model/types'
import { Card, Typography, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { MoreOutlined, FileTextOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { RoutePath } from '@/5_shared/config/routerConfig'
import cls from './ReferenceCard.module.css'

const { Text } = Typography

interface Props {
    reference: Reference
}

export const ReferenceCard = (props: Props) => {
    const { reference } = props

    const menuItems: MenuProps['items'] = reference.document_id
        ? [
              {
                  key: 'go-to-document',
                  label: (
                      <Link
                          to={RoutePath.document.replace(
                              ':id',
                              reference.document_id,
                          )}
                      >
                          Go to document
                      </Link>
                  ),
                  icon: <FileTextOutlined />,
              },
          ]
        : []

    return (
        <Card className={cls.referenceCard}>
            {reference.document_id && (
                <Dropdown
                    menu={{ items: menuItems }}
                    trigger={['click']}
                    placement="bottomRight"
                >
                    <MoreOutlined
                        className={cls.moreIcon}
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                        }}
                    />
                </Dropdown>
            )}
            {reference.reference_type && (
                <Text type="secondary" className={cls.referenceType}>
                    {reference.reference_type.replace(/_/g, ' ')}
                </Text>
            )}
            <Typography>{reference.original_text}</Typography>
        </Card>
    )
}

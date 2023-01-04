import {
  Button,
  Divider,
  Form,
  Upload,
  Select,
  Input as AntdInput,
  DatePicker,
  TimePicker,
  Collapse,
  Checkbox,
  Row,
  Col,
  Modal,
  Radio,
  notification,
} from 'antd'
// import Button from 'components/Button'
import Headline from 'components/Headline'
import Input from 'components/Input'
import DefaultLayout from 'layouts/DefaultLayout'
import React, { ReactElement, useEffect, useState } from 'react'
import { DollarOutlined, InboxOutlined } from '@ant-design/icons'
import { UploadFile } from 'antd/lib/upload/interface'
import { uniqueId } from 'lodash'
import { useAddPropertyMutation, useUploadFilesMutation } from 'store/appAPIs'
import { toFilesUpload } from 'helpers/fileUpload'
import { useRouter } from 'next/router'
import PostMapView from '../components/PostMapView'
import s from './PostForSale.module.scss'
import {
  APPLIANCES_OPTIONS,
  ARCHITECTURAL_STYLE,
  BASEMENT,
  BUILDING_AMENITIES,
  CONSTRUCTION_STATUS_OPTIONS,
  COOLING_TYPE,
  EXTERIOR,
  FLOOR_COVERING,
  HEATING_FUEL,
  HEATING_TYPE,
  HOUSING_TYPE_OPTIONS,
  INDOOR_FEATURES,
  OUTDOOR_AMENITIES,
  PARKING,
  ROOF,
  ROOMS,
  VIEW,
} from './constants'
import { PropertyFormType } from './types'
import { toPropertyInfoReq } from './helpers'

const PostForSale = () => {
  const [galleries, setGalleries] = useState<UploadFile[]>()

  const handleGalleriesUpload = ({ fileList }: { fileList: UploadFile[] }) => {
    setGalleries(fileList)
  }
  const [property, setProperty] = useState<PropertyFormType>({
    bathrooms: {
      total: 0,
      noOfTubs: 0,
    },
    bedrooms: {
      total: 0,
    },
    toilets: {
      total: 0,
    },
    floors: {
      total: 0,
    },
    description: '',
    verifyType: 'none',
    address: {
      province: '',
      district: '',
      ward: '',
      street: '',
    },
    location: {
      lon: 0,
      lat: 0,
    },
    prices: 0,
    area: 0,
    listingType: 'sell',
    facilities: [],
    furnitures: [],
    housingType: 'apartment',
    constructionStatus: 'finished',
    galleries: {
      fileList: [],
    },
    resources: [],
  })
  const router = useRouter()
  const [isExpandedForm, setIsExpandedForm] = useState<boolean>(false)
  const [mapVisible, setMapVisible] = useState<boolean>(false)
  const [dates, setDates] = useState([
    {
      id: uniqueId('__date'),
      date: undefined,
      startTime: undefined,
      endTime: undefined,
    },
  ])
  const [uploadFiles, { isLoading: uploading }] = useUploadFilesMutation()
  const [addProperty, { isError, isSuccess, isLoading, error }] = useAddPropertyMutation()

  useEffect(() => {
    if (isError) {
      const localError = error as any
      notification.error({
        message: 'Error',
        description: localError?.data?.errors[0] || 'Have occur error!',
        duration: 5,
      })
    }
  }, [isError])

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: 'Notification',
        description: 'Create property success.',
        duration: 5,
      })

      // router.push('/')
    }
  }, [isSuccess])

  const submit = async (e: PropertyFormType) => {
    const fileUpload = toFilesUpload(e.galleries.fileList)
    try {
      const uploadFileRes = await uploadFiles(fileUpload).unwrap()
      addProperty(toPropertyInfoReq(e, uploadFileRes?.data || []))
    } catch (err) {
      notification.error({
        message: 'Notification',
        description: 'Have occur error!',
        duration: 5,
      })
    }
  }

  const [form] = Form.useForm()

  return (
    <div className={s.mainContent}>
      <div>
        <Headline className={s.heading}>For Sale By Owner Listing</Headline>
        <p>100 Hilton Ave, Garden City, NY 11530</p>
        <p>
          Post once and your home will be listed on Veela, reaching buyers on the largest real estate network on the
          Web. Plus, home shoppers receive emails about new homes on the market – including yours.
        </p>
        <Divider className={s.divider} plain />
      </div>

      <Form
        name="basic"
        layout="vertical"
        initialValues={property}
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={submit}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Headline className={s.heading} level={2}>
          Set your price
        </Headline>
        <Form.Item
          name="prices"
          label="Price"
          wrapperCol={{
            offset: 0,
            span: 4,
          }}
          rules={[
            {
              required: true,
              message: 'Please set your price!',
            },
            {
              validator(_, val) {
                const validate = val > 0 ? Promise.resolve() : Promise.reject(new Error('Price must > 0'))

                return validate
              },
            },
          ]}
        >
          <Input type="number" prefix={<DollarOutlined />} />
        </Form.Item>

        <Divider className={s.divider} plain />

        <Headline className={s.heading} level={2}>
          Basic information
        </Headline>

        <Form.Item
          name="title"
          label="Title"
          wrapperCol={{
            offset: 0,
            span: 24,
          }}
          rules={[
            {
              required: true,
              message: 'Please input title!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="location" label="Address" required>
          <AntdInput.Group size="large">
            <Row gutter={16}>
              <Col span={12} sm={6}>
                <Form.Item
                  name={['location', 'lat']}
                  rules={[
                    {
                      required: true,
                      message: 'Please input',
                    },
                  ]}
                >
                  <Input placeholder="Lang" />
                </Form.Item>
              </Col>

              <Col span={12} sm={6}>
                <Form.Item
                  name={['location', 'lon']}
                  rules={[
                    {
                      required: true,
                      message: 'Please input',
                    },
                  ]}
                >
                  <Input placeholder="Lat" />
                </Form.Item>
              </Col>

              <Col span={24} sm={12} style={{ alignSelf: 'top' }}>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    setMapVisible(true)
                  }}
                >
                  Pin on map
                </Button>
              </Col>
            </Row>
          </AntdInput.Group>

          <AntdInput.Group size="large">
            <Row gutter={16}>
              <Col span={24} md={12}>
                <Form.Item
                  name={['address', 'province']}
                  rules={[
                    {
                      required: true,
                      message: 'Please input',
                    },
                  ]}
                >
                  <Input placeholder="Province" />
                </Form.Item>
              </Col>

              <Col span={24} md={12}>
                <Form.Item
                  name={['address', 'district']}
                  rules={[
                    {
                      required: true,
                      message: 'Please input',
                    },
                  ]}
                >
                  <Input placeholder="District" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: '8px' }}>
              <Col span={24} md={12}>
                <Form.Item
                  name={['address', 'ward']}
                  rules={[
                    {
                      required: true,
                      message: 'Please input',
                    },
                  ]}
                >
                  <Input placeholder="Ward" />
                </Form.Item>
              </Col>

              <Col span={24} md={12}>
                <Form.Item
                  name={['address', 'street']}
                  rules={[
                    {
                      required: true,
                      message: 'Please input',
                    },
                  ]}
                >
                  <Input placeholder="Street" />
                </Form.Item>
              </Col>
            </Row>
          </AntdInput.Group>
        </Form.Item>

        <Divider className={s.divider} plain />

        <Headline className={s.heading} level={2}>
          Photos
        </Headline>
        <Form.Item
          name="galleries"
          label="My photos"
          required
          rules={[
            {
              validator(_, val) {
                const validate =
                  val.fileList.length > 0 ? Promise.resolve() : Promise.reject(new Error('Please input your photos!'))

                return validate
              },
            },
          ]}
        >
          <Upload.Dragger
            action=""
            name="files"
            multiple
            accept="image/*"
            listType="picture-card"
            fileList={galleries}
            beforeUpload={() => false}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item
          label="Virtual tour URL"
          wrapperCol={{
            offset: 0,
            span: 12,
          }}
        >
          <Input />
        </Form.Item>

        <Headline className={s.heading} level={2}>
          Home facts
        </Headline>

        {/* ------------------- form left ------------------- */}
        <Row gutter={16}>
          <Col span={24} md={12}>
            {/* listing type */}
            <Form.Item
              style={{ marginBottom: '34px' }}
              name="listingType"
              label="Listing Type"
              rules={[
                {
                  required: true,
                  message: 'Please input',
                },
              ]}
            >
              <Radio.Group size="large">
                <Radio value="sell">Sell</Radio>
                <Radio value="rent">Rent</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="housingType"
              label="Home type"
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
            >
              <Select size="large">
                {HOUSING_TYPE_OPTIONS.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="bathrooms" style={{ marginBottom: 0 }}>
              <AntdInput.Group>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name={['bathrooms', 'total']}
                      label="Bathrooms:"
                      rules={[
                        {
                          required: true,
                          message: 'Please input',
                        },
                      ]}
                    >
                      <Input type="number" placeholder="0" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name={['bathrooms', 'noOfTubs']}
                      label="Number of Tubs:"
                      rules={[
                        {
                          required: true,
                          message: 'Please input',
                        },
                      ]}
                    >
                      <Input type="number" placeholder="0" />
                    </Form.Item>
                  </Col>
                </Row>
              </AntdInput.Group>
            </Form.Item>

            <Row gutter={16} wrap>
              <Col span={12}>
                <Form.Item
                  label="3/4 baths"
                  wrapperCol={{
                    offset: 0,
                    span: 24,
                  }}
                >
                  <Input type="number" placeholder="0" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="1/2 baths"
                  wrapperCol={{
                    offset: 0,
                    span: 24,
                  }}
                >
                  <Input type="number" placeholder="0" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="1/4 baths"
                  wrapperCol={{
                    offset: 0,
                    span: 24,
                  }}
                >
                  <Input type="number" placeholder="0" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  wrapperCol={{
                    offset: 0,
                    span: 24,
                  }}
                  name={['toilets', 'total']}
                  label="Toilets:"
                  rules={[
                    {
                      required: true,
                      message: 'Please input',
                    },
                  ]}
                >
                  <Input type="number" placeholder="0" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  wrapperCol={{
                    offset: 0,
                    span: 24,
                  }}
                  name={['bedrooms', 'total']}
                  label="Bedrooms:"
                  rules={[
                    {
                      required: true,
                      message: 'Please input',
                    },
                  ]}
                >
                  <Input type="number" placeholder="0" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name={['floors', 'total']}
                  label="Floors:"
                  wrapperCol={{
                    offset: 0,
                    span: 24,
                  }}
                  rules={[
                    {
                      required: true,
                      message: 'Please input',
                    },
                  ]}
                >
                  <Input type="number" placeholder="0" />
                </Form.Item>
              </Col>

              <Col span={12} />
            </Row>

            <Form.Item
              label="Finished square feet"
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
              name="area"
              rules={[
                {
                  required: true,
                  message: 'Please input area',
                },
                {
                  validator(_, val) {
                    const validate = val > 0 ? Promise.resolve() : Promise.reject(new Error('Sqrt must > 0'))

                    return validate
                  },
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>

          {/* ------------------- form right ------------------- */}
          <Col span={24} md={12}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Lot size"
                  wrapperCol={{
                    offset: 0,
                    span: 24,
                  }}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Sqft"
                  wrapperCol={{
                    offset: 0,
                    span: 24,
                  }}
                >
                  <Select size="large" value="1">
                    <Select.Option value="1">Sqft</Select.Option>
                    <Select.Option value="2">Acret</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Yeah built"
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
            >
              <DatePicker picker="year" />
            </Form.Item>

            <Form.Item
              label="Structural remodel year"
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
            >
              <DatePicker picker="year" />
            </Form.Item>

            <Form.Item
              label="HOA dues (per month)"
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
            >
              <Input type="number" placeholder="0" prefix={<DollarOutlined />} />
            </Form.Item>

            <Row gutter={16}>
              <Col span={24} lg={12}>
                <Form.Item
                  label="Basement sq. ft."
                  wrapperCol={{
                    offset: 0,
                    span: 24,
                  }}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={24} lg={12}>
                <Form.Item
                  label="Garage sq. ft."
                  wrapperCol={{
                    offset: 0,
                    span: 24,
                  }}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Describe your home"
              name="description"
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
            >
              <AntdInput.TextArea />
            </Form.Item>
          </Col>
        </Row>

        <Divider className={s.divider} plain />

        {/* ------------- Open house ----------- */}
        <Headline className={s.heading} level={2}>
          Open house
        </Headline>

        <p>
          Open houses may not currently allow for social distancing or comply with public health orders. Please consider
          alternatives, such as Veela 3D Home tours, or scheduling a real-time video tour.
        </p>

        {dates.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            <Row gutter={16}>
              <Col span={24} sm={12}>
                <Form.Item
                  label="Date"
                  wrapperCol={{
                    offset: 0,
                    span: 24,
                  }}
                >
                  <DatePicker format="DD/MM/YYYY" defaultValue={item.date} />
                </Form.Item>
              </Col>

              <Col span={24} sm={12}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Start time"
                      wrapperCol={{
                        offset: 0,
                        span: 24,
                      }}
                    >
                      <TimePicker defaultValue={item.startTime} />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="End time"
                      wrapperCol={{
                        offset: 0,
                        span: 24,
                      }}
                    >
                      <TimePicker defaultValue={item.endTime} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Button
              onClick={() => setDates(dates.filter((itemX) => itemX.id !== item.id))}
              className={s.removeBtn}
              type="link"
            >
              Remove
            </Button>
          </div>
        ))}

        <div>
          <Button
            className={s.addDateBtn}
            onClick={() =>
              setDates([
                ...dates,
                {
                  id: uniqueId('__date'),
                  date: undefined,
                  startTime: undefined,
                  endTime: undefined,
                },
              ])
            }
            type="link"
          >
            Add another date
          </Button>
        </div>

        <Divider className={s.divider} plain />

        {/* -------------- Additional information --------------- */}
        <Headline className={s.heading} level={2}>
          Additional information
        </Headline>

        <Row gutter={16}>
          <Col span={24} sm={12}>
            <Form.Item
              label="Related website"
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={24} sm={12}>
            <Form.Item
              label="What I love about this home"
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
            >
              <AntdInput.TextArea />
            </Form.Item>
            <p>
              Say what you love about it and what makes it unique, talk about the neighborhood and lifestyle it
              provides.
            </p>
          </Col>
        </Row>

        <Row
          wrap
          style={{
            marginLeft: '-16px',
            marginRight: '-16px',
            marginTop: '16px',
          }}
        >
          <Col span={24} sm={12}>
            <Collapse ghost className={s.checkboxGroup}>
              <Collapse.Panel key="1" header="ROOM DETAILS">
                <p className={s.checkboxGroupTitle}>APPLIANCES</p>
                <Form.Item>
                  <Checkbox.Group options={APPLIANCES_OPTIONS} />
                </Form.Item>

                <p className={s.checkboxGroupTitle}>BASEMENT</p>
                <Form.Item>
                  <Checkbox.Group options={BASEMENT} />
                </Form.Item>

                <p className={s.checkboxGroupTitle}>FLOOR COVERING</p>
                <Form.Item>
                  <Checkbox.Group options={FLOOR_COVERING} />
                </Form.Item>

                <p className={s.checkboxGroupTitle}>ROOMS</p>
                <Form.Item>
                  <Checkbox.Group options={ROOMS} />
                </Form.Item>

                <p className={s.checkboxGroupTitle}>Total rooms</p>
                <Form.Item style={{ width: '50%' }}>
                  <Input type="number" />
                </Form.Item>

                <p className={s.checkboxGroupTitle}>INDOOR FEATURES</p>
                <Form.Item>
                  <Checkbox.Group options={INDOOR_FEATURES} />
                </Form.Item>
              </Collapse.Panel>
            </Collapse>
          </Col>

          <Col span={24} sm={12}>
            <Collapse ghost className={s.checkboxGroup}>
              <Collapse.Panel key="1" header="UTILITY DETAILS">
                <p className={s.checkboxGroupTitle}>COOLING TYPE</p>
                <Form.Item>
                  <Checkbox.Group options={COOLING_TYPE} />
                </Form.Item>

                <p className={s.checkboxGroupTitle}>HEATING TYPE</p>
                <Form.Item>
                  <Checkbox.Group options={HEATING_TYPE} />
                </Form.Item>

                <p className={s.checkboxGroupTitle}>HEATING FUEL</p>
                <Form.Item>
                  <Checkbox.Group options={HEATING_FUEL} />
                </Form.Item>
              </Collapse.Panel>
            </Collapse>
          </Col>

          <Col span={24} sm={12}>
            <Collapse ghost className={s.checkboxGroup}>
              <Collapse.Panel key="1" header="BUILDING DETAILS">
                <p className={s.checkboxGroupTitle}>BUILDING AMENITIES</p>
                <Form.Item>
                  <Checkbox.Group options={BUILDING_AMENITIES} />
                </Form.Item>

                <p className={s.checkboxGroupTitle}>ARCHITECTURAL STYLE</p>
                <Form.Item>
                  <Checkbox.Group options={ARCHITECTURAL_STYLE} />
                </Form.Item>

                <p className={s.checkboxGroupTitle}>EXTERIOR</p>
                <Form.Item>
                  <Checkbox.Group options={EXTERIOR} />
                </Form.Item>

                <p className={s.checkboxGroupTitle}>OUTDOOR AMENITIES</p>
                <Form.Item>
                  <Checkbox.Group options={OUTDOOR_AMENITIES} />
                </Form.Item>

                <p className={s.checkboxGroupTitle}># of Stories</p>
                <Form.Item style={{ width: '50%' }}>
                  <Input type="number" />
                </Form.Item>

                <p className={s.checkboxGroupTitle}>PARKING</p>
                <Form.Item>
                  <Checkbox.Group options={PARKING} />
                </Form.Item>

                <p className={s.checkboxGroupTitle}># Parking Spaces</p>
                <Form.Item style={{ width: '50%' }}>
                  <Input type="number" />
                </Form.Item>

                <p className={s.checkboxGroupTitle}>ROOF</p>
                <Form.Item>
                  <Checkbox.Group options={ROOF} />
                </Form.Item>

                <p className={s.checkboxGroupTitle}>VIEW</p>
                <Form.Item>
                  <Checkbox.Group options={VIEW} />
                </Form.Item>
              </Collapse.Panel>
            </Collapse>
          </Col>
        </Row>

        <Divider className={s.divider} plain />

        {/* -------------- Contact information --------------- */}
        <Headline className={s.heading} level={2}>
          Contact information
        </Headline>

        <p>
          Potential buyers will contact you through the email address you use to register on Veela. You must also add
          your phone number to the listing here.
        </p>

        <Form.Item
          label="Phone number"
          wrapperCol={{
            offset: 0,
            span: 12,
          }}
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: 'Please input phone number',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Divider className={s.divider} plain />

        <Form.Item name="constructionStatus" label="Construction Status">
          <Radio.Group>
            {CONSTRUCTION_STATUS_OPTIONS.map((option) => (
              <Radio key={option.value} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        <Divider className={s.divider} plain />

        <div>
          <Checkbox className={s.agreeCheckbox} onChange={() => setIsExpandedForm(!isExpandedForm)}>
            I agree to, acknowledge and understand the following: (i) I am (or I have authority to act on behalf of) the
            owner of this home; (ii) I will not provide incorrect information or state a discriminatory preference ;
            (iii) I will be posting my property for sale by owner on zillow.com and other affiliated websites and that I
            will solely be responsible for maintaining and updating the posting and responding to and negotiating
            potential offers to purchase the property; (iv) Veela, Inc. (Veela) is a licensed real estate brokerage,
            that I am not entering into any agency or brokerage relationship with Veela as part of this posting and that
            Veela is not providing me with any real estate brokerage services as part of this posting; and (v) I will
            comply with the Veela Terms of Use and Listing Quality Policy I also agree that by clicking below, Veela
            Group and its affiliates, and real estate professionals may call or text me for marketing purposes, which
            may involve use of automated means and prerecorded/artificial voices. Consent is not a condition of buying
            any property, goods or services. Message/data rates may apply.{' '}
          </Checkbox>
        </div>

        {/* ------------------- Btn submit ------------------- */}
        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 24,
          }}
        >
          <Button loading={uploading || isLoading} disabled={!isExpandedForm} type="primary" htmlType="submit">
            Post for sale by owner
          </Button>
        </Form.Item>
      </Form>

      <Modal
        visible={mapVisible}
        className={s.mapModal}
        onCancel={() => {
          setMapVisible(false)
        }}
      >
        <PostMapView form={form} location={property.location} />
      </Modal>
    </div>
  )
}

PostForSale.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default PostForSale

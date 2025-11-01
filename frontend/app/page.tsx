'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('cybersecurity')
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState({
    businessType: '',
    employees: '',
    onlinePayments: '',
    personalPhones: '',
    customerData: '',
    passwordPolicy: '',
    phishingTraining: '',
    dataBackups: ''
  })

  const nextStep = () => setFormStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setFormStep(prev => Math.max(prev - 1, 1))

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleGenerateReport = () => {
    // In a real app, this would submit to your backend
    alert('Assessment submitted! Redirecting to detailed assessment...')
    window.location.href = '/security-assessment'
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent-red via-accent-purple to-accent-blue text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Protect Your Business. Boost Your Growth.</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Free digital tools designed specifically for Nigerian SMEs to defend against cyber threats and manage operations efficiently.
          </p>
          <Link 
            href="/security-assessment" 
            className="bg-white text-primary-500 hover:bg-gray-100 text-lg px-8 py-3 rounded-full font-semibold inline-flex items-center gap-2 transition-colors"
          >
            Start Free Assessment <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary-500 mb-12">Why NaijaBiz Shield?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🛡️', title: 'Digital Protection', desc: 'Defend against common Nigerian cyber threats like fake alerts, WhatsApp hijacking, and phishing scams.' },
              { icon: '💰', title: 'Completely Free', desc: 'No hidden costs. Enterprise-level protection accessible to every Nigerian business, regardless of size.' },
              { icon: '📱', title: 'Local Context', desc: 'Built specifically for Nigerian business challenges, regulations, and connectivity issues.' },
              { icon: '📊', title: 'Business Intelligence', desc: 'AI-powered insights to help you make smarter decisions about inventory, sales, and growth.' }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-primary-500 hover:transform hover:-translate-y-2 transition-transform duration-300">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary-500 mb-12">Our Core Modules</h2>
          
          {/* Tabs */}
          <div className="flex justify-center border-b border-gray-200 mb-8">
            {[
              { id: 'cybersecurity', label: 'Cybersecurity Assessment' },
              { id: 'inventory', label: 'Inventory Management' },
              { id: 'alerts', label: 'Threat Alerts' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
                  activeTab === tab.id 
                    ? 'border-primary-500 text-primary-500' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Cybersecurity Assessment Tab */}
            {activeTab === 'cybersecurity' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Digital Resilience Self-Assessment</h3>
                <p className="text-gray-600 mb-6">Evaluate your business's cybersecurity posture and get actionable recommendations.</p>
                
                <div className="max-w-2xl mx-auto">
                  <div className="assessment-form">
                    {/* Step 1 */}
                    <div className={`form-step ${formStep === 1 ? 'block' : 'hidden'}`}>
                      <div className="form-group mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900"
                          value={formData.businessType}
                          onChange={(e) => handleInputChange('businessType', e.target.value)}
                        >
                          <option value="" className="text-gray-500">Select your business type</option>
                          <option value="retail" className="text-gray-900">Retail/Shop</option>
                          <option value="service" className="text-gray-900">Service Provider</option>
                          <option value="restaurant" className="text-gray-900">Restaurant/Food Business</option>
                          <option value="online" className="text-gray-900">Online Business</option>
                          <option value="other" className="text-gray-900">Other</option>
                        </select>
                      </div>
                      
                      <div className="form-group mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Employees</label>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900"
                          value={formData.employees}
                          onChange={(e) => handleInputChange('employees', e.target.value)}
                        >
                          <option value="" className="text-gray-500">Select number of employees</option>
                          <option value="1-5" className="text-gray-900">1-5</option>
                          <option value="6-10" className="text-gray-900">6-10</option>
                          <option value="11-20" className="text-gray-900">11-20</option>
                          <option value="20+" className="text-gray-900">20+</option>
                        </select>
                      </div>
                      
                      <div className="form-actions flex justify-between mt-8">
                        <button 
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors opacity-50 cursor-not-allowed"
                          disabled
                        >
                          Previous
                        </button>
                        <button 
                          className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
                          onClick={nextStep}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                    
                    {/* Step 2 */}
                    <div className={`form-step ${formStep === 2 ? 'block' : 'hidden'}`}>
                      <div className="form-group mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Do you accept online payments?</label>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900"
                          value={formData.onlinePayments}
                          onChange={(e) => handleInputChange('onlinePayments', e.target.value)}
                        >
                          <option value="" className="text-gray-500">Select option</option>
                          <option value="yes" className="text-gray-900">Yes</option>
                          <option value="no" className="text-gray-900">No</option>
                        </select>
                      </div>
                      
                      <div className="form-group mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Do employees use personal phones for work?</label>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900"
                          value={formData.personalPhones}
                          onChange={(e) => handleInputChange('personalPhones', e.target.value)}
                        >
                          <option value="" className="text-gray-500">Select option</option>
                          <option value="yes" className="text-gray-900">Yes</option>
                          <option value="no" className="text-gray-900">No</option>
                          <option value="sometimes" className="text-gray-900">Sometimes</option>
                        </select>
                      </div>
                      
                      <div className="form-group mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Is your customer data stored digitally?</label>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900"
                          value={formData.customerData}
                          onChange={(e) => handleInputChange('customerData', e.target.value)}
                        >
                          <option value="" className="text-gray-500">Select option</option>
                          <option value="yes" className="text-gray-900">Yes</option>
                          <option value="no" className="text-gray-900">No</option>
                          <option value="partially" className="text-gray-900">Partially</option>
                        </select>
                      </div>
                      
                      <div className="form-actions flex justify-between mt-8">
                        <button 
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                          onClick={prevStep}
                        >
                          Previous
                        </button>
                        <button 
                          className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
                          onClick={nextStep}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                    
                    {/* Step 3 */}
                    <div className={`form-step ${formStep === 3 ? 'block' : 'hidden'}`}>
                      <div className="form-group mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Do you enforce strong password policies?</label>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900"
                          value={formData.passwordPolicy}
                          onChange={(e) => handleInputChange('passwordPolicy', e.target.value)}
                        >
                          <option value="" className="text-gray-500">Select option</option>
                          <option value="yes" className="text-gray-900">Yes</option>
                          <option value="no" className="text-gray-900">No</option>
                          <option value="not-sure" className="text-gray-900">Not Sure</option>
                        </select>
                      </div>
                      
                      <div className="form-group mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Are staff trained to recognize phishing emails?</label>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900"
                          value={formData.phishingTraining}
                          onChange={(e) => handleInputChange('phishingTraining', e.target.value)}
                        >
                          <option value="" className="text-gray-500">Select option</option>
                          <option value="yes" className="text-gray-900">Yes</option>
                          <option value="no" className="text-gray-900">No</option>
                          <option value="partially" className="text-gray-900">Partially</option>
                        </select>
                      </div>
                      
                      <div className="form-group mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Do you have automatic data backups?</label>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900"
                          value={formData.dataBackups}
                          onChange={(e) => handleInputChange('dataBackups', e.target.value)}
                        >
                          <option value="" className="text-gray-500">Select option</option>
                          <option value="yes" className="text-gray-900">Yes</option>
                          <option value="no" className="text-gray-900">No</option>
                          <option value="manual" className="text-gray-900">Manual Backups Only</option>
                        </select>
                      </div>
                      
                      <div className="form-actions flex justify-between mt-8">
                        <button 
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                          onClick={prevStep}
                        >
                          Previous
                        </button>
                        <button 
                          className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
                          onClick={handleGenerateReport}
                        >
                          Generate Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Inventory Management Tab */}
            {activeTab === 'inventory' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Simple Inventory Management</h3>
                <p className="text-gray-600 mb-6">Track your products, monitor stock levels, and get AI-powered insights.</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow border">
                      {/* FIXED: Improved "Add New Product" heading visibility */}
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Add New Product</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900"
                            placeholder="Enter product name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900">
                            <option value="" className="text-gray-500">Select category</option>
                            <option value="electronics" className="text-gray-900">Electronics</option>
                            <option value="clothing" className="text-gray-900">Clothing</option>
                            <option value="food" className="text-gray-900">Food Items</option>
                            <option value="other" className="text-gray-900">Other</option>
                          </select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cost Price (₦)</label>
                            <input 
                              type="number" 
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900"
                              placeholder="0.00"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (₦)</label>
                            <input 
                              type="number" 
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900"
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Initial Stock</label>
                          <input 
                            type="number" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900"
                            placeholder="0"
                          />
                        </div>
                        
                        <button className="w-full bg-primary-500 text-white py-2 rounded hover:bg-primary-600 transition-colors font-semibold">
                          Add Product
                        </button>
                      </div>

                      <div className="mt-6">
                        {/* FIXED: Improved "Business Health" heading visibility */}
                        <h4 className="text-lg font-bold text-gray-900 mb-3">Business Health</h4>
                        <div className="bg-yellow-50 border-l-4 border-primary-500 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span>💡</span>
                            <strong className="text-sm text-gray-900">AI Insight</strong>
                          </div>
                          <p className="text-sm text-gray-700">
                            Your best-selling product, <strong className="text-gray-900">Android Phones</strong>, is running low. Based on past sales, you might run out in 5 days.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-3">
                    <div className="bg-white p-6 rounded-lg shadow border">
                      {/* FIXED: Improved "Product Inventory" heading visibility */}
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Product Inventory</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Product Name</th>
                              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Category</th>
                              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Cost Price</th>
                              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Selling Price</th>
                              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Stock Level</th>
                              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { name: 'Android Phones', category: 'Electronics', cost: '₦45,000', price: '₦55,000', stock: 8, status: 'Low Stock', lowStock: true },
                              { name: 'Men\'s Casual Shirts', category: 'Clothing', cost: '₦3,500', price: '₦5,000', stock: 25, status: 'In Stock', lowStock: false },
                              { name: 'Rice (50kg)', category: 'Food Items', cost: '₦28,000', price: '₦32,000', stock: 12, status: 'In Stock', lowStock: false },
                              { name: 'Air Conditioner', category: 'Electronics', cost: '₦120,000', price: '₦150,000', stock: 5, status: 'Low Stock', lowStock: true }
                            ].map((product, index) => (
                              <tr key={index} className="border-t">
                                <td className="px-4 py-3 text-sm text-gray-900">{product.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{product.category}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{product.cost}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{product.price}</td>
                                <td className={`px-4 py-3 text-sm font-semibold ${product.lowStock ? 'text-accent-red' : 'text-gray-900'}`}>
                                  {product.stock}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  <span className={product.lowStock ? 'text-accent-red font-semibold' : 'text-gray-900'}>
                                    {product.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Threat Alerts Tab */}
            {activeTab === 'alerts' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Current Threat Alerts for Nigerian Businesses</h3>
                <p className="text-gray-600 mb-6">Stay informed about the latest scams and security threats targeting SMEs in Nigeria.</p>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: '⚠️',
                      title: 'WhatsApp Business Account Hijacking',
                      description: 'Attackers are targeting business WhatsApp accounts by pretending to be customers and sending verification codes. Once they gain access, they message your contacts for payments.',
                      tip: 'Never share your WhatsApp verification code with anyone.'
                    },
                    {
                      icon: '⚠️',
                      title: 'Fake Bank Alert Scams',
                      description: 'Scammers are using manipulated bank alert screenshots or SMS to convince businesses that payments have been made. Products are released before actual funds arrive.',
                      tip: 'Always verify transactions directly through your bank app or USSD code before releasing goods.'
                    },
                    {
                      icon: '⚠️',
                      title: 'Vendor Impersonation Fraud',
                      description: 'Fraudsters are impersonating legitimate vendors and sending fake invoices with changed bank account details.',
                      tip: 'Always verify payment details directly with vendors using previously established contact methods.'
                    }
                  ].map((alert, index) => (
                    <div key={index} className="bg-yellow-50 border-l-4 border-primary-500 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span>{alert.icon}</span>
                        <strong className="text-gray-900">{alert.title}</strong>
                      </div>
                      <p className="text-gray-700 mb-2">{alert.description}</p>
                      <p className="text-sm text-gray-600">
                        <strong>Protection Tip:</strong> {alert.tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-primary-500 mb-4">NaijaBiz Shield</h3>
              <p className="text-gray-300">Digital protection and business management tools designed specifically for Nigerian SMEs.</p>
              <p className="text-gray-300 mt-2">Abuja, Nigeria</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-primary-500 mb-4">Modules</h3>
              <ul className="space-y-2">
                <li><Link href="/security-assessment" className="text-gray-300 hover:text-white transition-colors">Cybersecurity Assessment</Link></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Inventory Management</a></li>
                <li><Link href="/threats" className="text-gray-300 hover:text-white transition-colors">Threat Alerts</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-primary-500 mb-4">Contact Us</h3>
              <p className="text-gray-300">Email: info@naijabizshield.ng</p>
              <p className="text-gray-300">Phone: +234 800 123 4567</p>
            </div>
          </div>
          
          <div className="border-t border-gray-600 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 InspireNova Enterprises. Built for Nigerian SMEs.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

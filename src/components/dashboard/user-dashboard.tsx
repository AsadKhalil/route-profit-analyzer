import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  Upload, Plus, Database, FileSpreadsheet, Truck, MapPin,
  LogOut, User, Save, Download
} from "lucide-react";

interface UserDashboardProps {
  onLogout: () => void;
}

export function UserDashboard({ onLogout }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<'manual' | 'csv'>('manual');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    gpsProvider: '',
    bookingId: '',
    tripType: '',
    vehicleNo: '',
    originLocation: '',
    destinationLocation: '',
    transportationDistance: '',
    vehicleType: '',
    driverName: '',
    driverMobile: '',
    customerId: '',
    customerName: '',
    supplierId: '',
    supplierName: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Trip Data Added Successfully",
      description: "The trip information has been saved to the database.",
    });

    // Reset form
    setFormData({
      gpsProvider: '',
      bookingId: '',
      tripType: '',
      vehicleNo: '',
      originLocation: '',
      destinationLocation: '',
      transportationDistance: '',
      vehicleType: '',
      driverName: '',
      driverMobile: '',
      customerId: '',
      customerName: '',
      supplierId: '',
      supplierName: ''
    });
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFile(file);
      toast({
        title: "CSV File Selected",
        description: `File "${file.name}" is ready to upload.`,
      });
    }
  };

  const processCsvUpload = async () => {
    if (!csvFile) return;

    // Simulate CSV processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "CSV Upload Successful",
      description: `Processed ${csvFile.name} - 45 records added to database.`,
    });
    
    setCsvFile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">FleetPro Data Entry</h1>
            </div>
            <Badge variant="outline">Data Entry User</Badge>
          </div>
          
          <Button variant="outline" onClick={onLogout} className="hover-shadow">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto">
        {/* Tab Selection */}
        <Card className="mb-6 card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-primary" />
              <span>Add Trip Data</span>
            </CardTitle>
            <CardDescription>
              Choose how you want to add trip data to the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Button
                variant={activeTab === 'manual' ? 'default' : 'outline'}
                onClick={() => setActiveTab('manual')}
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Manual Entry</span>
              </Button>
              <Button
                variant={activeTab === 'csv' ? 'default' : 'outline'}
                onClick={() => setActiveTab('csv')}
                className="flex items-center space-x-2"
              >
                <FileSpreadsheet className="h-4 w-4" />
                <span>CSV Upload</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Manual Entry Form */}
        {activeTab === 'manual' && (
          <Card className="card-shadow hover-shadow">
            <CardHeader>
              <CardTitle>Manual Trip Data Entry</CardTitle>
              <CardDescription>
                Fill in the trip details manually
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Trip Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gpsProvider">GPS Provider</Label>
                    <Input
                      id="gpsProvider"
                      value={formData.gpsProvider}
                      onChange={(e) => handleInputChange('gpsProvider', e.target.value)}
                      placeholder="Enter GPS provider name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bookingId">Booking ID</Label>
                    <Input
                      id="bookingId"
                      value={formData.bookingId}
                      onChange={(e) => handleInputChange('bookingId', e.target.value)}
                      placeholder="Unique booking identifier"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tripType">Trip Type</Label>
                    <Select onValueChange={(value) => handleInputChange('tripType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select trip type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="regular">Regular</SelectItem>
                        <SelectItem value="market">Market</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleNo">Vehicle Number</Label>
                    <Input
                      id="vehicleNo"
                      value={formData.vehicleNo}
                      onChange={(e) => handleInputChange('vehicleNo', e.target.value)}
                      placeholder="MH-12-AB-1234"
                      required
                    />
                  </div>
                </div>

                {/* Route Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="originLocation">Origin Location</Label>
                    <Input
                      id="originLocation"
                      value={formData.originLocation}
                      onChange={(e) => handleInputChange('originLocation', e.target.value)}
                      placeholder="Starting location"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destinationLocation">Destination Location</Label>
                    <Input
                      id="destinationLocation"
                      value={formData.destinationLocation}
                      onChange={(e) => handleInputChange('destinationLocation', e.target.value)}
                      placeholder="Ending location"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="transportationDistance">Distance (KM)</Label>
                    <Input
                      id="transportationDistance"
                      type="number"
                      value={formData.transportationDistance}
                      onChange={(e) => handleInputChange('transportationDistance', e.target.value)}
                      placeholder="Total distance in kilometers"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleType">Vehicle Type</Label>
                    <Select onValueChange={(value) => handleInputChange('vehicleType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="truck">Truck</SelectItem>
                        <SelectItem value="trailer">Trailer</SelectItem>
                        <SelectItem value="container">Container</SelectItem>
                        <SelectItem value="tanker">Tanker</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Driver Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="driverName">Driver Name</Label>
                    <Input
                      id="driverName"
                      value={formData.driverName}
                      onChange={(e) => handleInputChange('driverName', e.target.value)}
                      placeholder="Driver's full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driverMobile">Driver Mobile</Label>
                    <Input
                      id="driverMobile"
                      type="tel"
                      value={formData.driverMobile}
                      onChange={(e) => handleInputChange('driverMobile', e.target.value)}
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                {/* Customer & Supplier Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerId">Customer ID</Label>
                    <Input
                      id="customerId"
                      value={formData.customerId}
                      onChange={(e) => handleInputChange('customerId', e.target.value)}
                      placeholder="Customer identifier"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Input
                      id="customerName"
                      value={formData.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      placeholder="Customer company name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="supplierId">Supplier ID</Label>
                    <Input
                      id="supplierId"
                      value={formData.supplierId}
                      onChange={(e) => handleInputChange('supplierId', e.target.value)}
                      placeholder="Supplier identifier"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supplierName">Supplier Name</Label>
                    <Input
                      id="supplierName"
                      value={formData.supplierName}
                      onChange={(e) => handleInputChange('supplierName', e.target.value)}
                      placeholder="Supplier company name"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full logistics-gradient hover:opacity-90">
                  <Save className="h-4 w-4 mr-2" />
                  Save Trip Data
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* CSV Upload */}
        {activeTab === 'csv' && (
          <Card className="card-shadow hover-shadow">
            <CardHeader>
              <CardTitle>CSV File Upload</CardTitle>
              <CardDescription>
                Upload a CSV file with trip data. Make sure your CSV includes the required columns.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="space-y-2">
                  <Label htmlFor="csvFile" className="cursor-pointer">
                    <span className="text-lg font-medium">Choose CSV file</span>
                    <p className="text-sm text-muted-foreground">
                      or drag and drop your file here
                    </p>
                  </Label>
                  <Input
                    id="csvFile"
                    type="file"
                    accept=".csv"
                    onChange={handleCsvUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {csvFile && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileSpreadsheet className="h-5 w-5 text-secondary" />
                      <span className="font-medium">{csvFile.name}</span>
                      <Badge variant="secondary">{(csvFile.size / 1024).toFixed(1)} KB</Badge>
                    </div>
                    <Button onClick={processCsvUpload} className="logistics-gradient">
                      Process Upload
                    </Button>
                  </div>
                </div>
              )}

              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Required CSV Columns:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                  <div>• GPS Provider</div>
                  <div>• Booking ID</div>
                  <div>• Trip Type</div>
                  <div>• Vehicle Number</div>
                  <div>• Origin Location</div>
                  <div>• Destination Location</div>
                  <div>• Distance (KM)</div>
                  <div>• Vehicle Type</div>
                  <div>• Driver Name</div>
                </div>
                <Button variant="outline" size="sm" className="mt-3">
                  <Download className="h-4 w-4 mr-2" />
                  Download Sample CSV
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
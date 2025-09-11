import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  Upload, Plus, Database, FileSpreadsheet, Truck, MapPin,
  LogOut, User, Save, Download, Calendar, Loader2
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCreateTrip, useTrips } from "@/hooks/useTrips";

export function EnhancedUserDashboard() {
  const [activeTab, setActiveTab] = useState<'manual' | 'csv'>('manual');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const { profile, signOut } = useAuth();
  const { toast } = useToast();
  const createTripMutation = useCreateTrip();
  const { trips, isLoading: tripsLoading } = useTrips();

  const [formData, setFormData] = useState({
    gpsProvider: '',
    bookingId: '',
    tripType: '',
    bookingDate: '',
    vehicleNo: '',
    originLocation: '',
    destinationLocation: '',
    originLatLon: '',
    destinationLatLon: '',
    transportationDistance: '',
    vehicleType: '',
    driverName: '',
    driverMobile: '',
    customerId: '',
    customerNameCode: '',
    supplierId: '',
    supplierNameCode: '',
    fuelCost: '',
    revenue: '',
    profit: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createTripMutation.mutateAsync({
        gps_provider: formData.gpsProvider || null,
        booking_id: formData.bookingId,
        trip_type: formData.tripType || null,
        booking_date: formData.bookingDate,
        vehicle_no: formData.vehicleNo || null,
        origin_location: formData.originLocation,
        destination_location: formData.destinationLocation,
        origin_lat_lon: formData.originLatLon || null,
        destination_lat_lon: formData.destinationLatLon || null,
        transportation_distance_km: formData.transportationDistance ? parseFloat(formData.transportationDistance) : null,
        vehicle_type: formData.vehicleType || null,
        driver_name: formData.driverName || null,
        driver_mobile_no: formData.driverMobile || null,
        customer_id: formData.customerId || null,
        customer_name_code: formData.customerNameCode || null,
        supplier_id: formData.supplierId || null,
        supplier_name_code: formData.supplierNameCode || null,
        fuel_cost: formData.fuelCost ? parseFloat(formData.fuelCost) : null,
        revenue: formData.revenue ? parseFloat(formData.revenue) : null,
        profit: formData.profit ? parseFloat(formData.profit) : null,
      });

      toast({
        title: "Trip Data Added Successfully",
        description: "The trip information has been saved to the database.",
      });

      // Reset form
      setFormData({
        gpsProvider: '',
        bookingId: '',
        tripType: '',
        bookingDate: '',
        vehicleNo: '',
        originLocation: '',
        destinationLocation: '',
        originLatLon: '',
        destinationLatLon: '',
        transportationDistance: '',
        vehicleType: '',
        driverName: '',
        driverMobile: '',
        customerId: '',
        customerNameCode: '',
        supplierId: '',
        supplierNameCode: '',
        fuelCost: '',
        revenue: '',
        profit: ''
      });
    } catch (error) {
      toast({
        title: "Error Saving Trip",
        description: "Failed to save trip data. Please try again.",
        variant: "destructive",
      });
    }
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

    // This is a placeholder for CSV processing
    // You would implement actual CSV parsing and bulk insert here
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "CSV Upload Feature",
      description: "CSV bulk upload feature will be implemented next. For now, please use manual entry.",
      variant: "destructive",
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
            <Badge variant="secondary">{profile?.full_name || profile?.email}</Badge>
          </div>
          
          <Button variant="outline" onClick={signOut} className="hover-shadow">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="p-6 max-w-6xl mx-auto">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="card-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">My Trips</p>
                  <p className="text-2xl font-bold">{trips?.length || 0}</p>
                </div>
                <Truck className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today</p>
                  <p className="text-2xl font-bold">{new Date().toLocaleDateString('en-IN', { day: 'numeric' })}</p>
                </div>
                <Calendar className="h-6 w-6 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-lg font-semibold text-green-600">Active</p>
                </div>
                <User className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bookingId">Booking ID *</Label>
                    <Input
                      id="bookingId"
                      value={formData.bookingId}
                      onChange={(e) => handleInputChange('bookingId', e.target.value)}
                      placeholder="Enter unique booking ID"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bookingDate">Booking Date *</Label>
                    <Input
                      id="bookingDate"
                      type="date"
                      value={formData.bookingDate}
                      onChange={(e) => handleInputChange('bookingDate', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tripType">Trip Type</Label>
                    <Select onValueChange={(value) => handleInputChange('tripType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select trip type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Regular">Regular</SelectItem>
                        <SelectItem value="Market">Market</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

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
                    <Label htmlFor="vehicleNo">Vehicle Number</Label>
                    <Input
                      id="vehicleNo"
                      value={formData.vehicleNo}
                      onChange={(e) => handleInputChange('vehicleNo', e.target.value)}
                      placeholder="MH-12-AB-1234"
                    />
                  </div>
                </div>

                {/* Route Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="originLocation">Origin Location *</Label>
                    <Input
                      id="originLocation"
                      value={formData.originLocation}
                      onChange={(e) => handleInputChange('originLocation', e.target.value)}
                      placeholder="Starting location"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destinationLocation">Destination Location *</Label>
                    <Input
                      id="destinationLocation"
                      value={formData.destinationLocation}
                      onChange={(e) => handleInputChange('destinationLocation', e.target.value)}
                      placeholder="Ending location"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="transportationDistance">Distance (KM)</Label>
                    <Input
                      id="transportationDistance"
                      type="number"
                      step="0.01"
                      value={formData.transportationDistance}
                      onChange={(e) => handleInputChange('transportationDistance', e.target.value)}
                      placeholder="Total distance"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleType">Vehicle Type</Label>
                    <Select onValueChange={(value) => handleInputChange('vehicleType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Heavy Truck">Heavy Truck</SelectItem>
                        <SelectItem value="Medium Truck">Medium Truck</SelectItem>
                        <SelectItem value="Light Truck">Light Truck</SelectItem>
                        <SelectItem value="Container">Container</SelectItem>
                        <SelectItem value="Tanker">Tanker</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuelCost">Fuel Cost (₹)</Label>
                    <Input
                      id="fuelCost"
                      type="number"
                      step="0.01"
                      value={formData.fuelCost}
                      onChange={(e) => handleInputChange('fuelCost', e.target.value)}
                      placeholder="Fuel cost"
                    />
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
                    <Label htmlFor="customerNameCode">Customer Name Code</Label>
                    <Input
                      id="customerNameCode"
                      value={formData.customerNameCode}
                      onChange={(e) => handleInputChange('customerNameCode', e.target.value)}
                      placeholder="Customer code name"
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
                    <Label htmlFor="supplierNameCode">Supplier Name Code</Label>
                    <Input
                      id="supplierNameCode"
                      value={formData.supplierNameCode}
                      onChange={(e) => handleInputChange('supplierNameCode', e.target.value)}
                      placeholder="Supplier code name"
                    />
                  </div>
                </div>

                {/* Financial Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="revenue">Revenue (₹)</Label>
                    <Input
                      id="revenue"
                      type="number"
                      step="0.01"
                      value={formData.revenue}
                      onChange={(e) => handleInputChange('revenue', e.target.value)}
                      placeholder="Total revenue"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profit">Profit (₹)</Label>
                    <Input
                      id="profit"
                      type="number"
                      step="0.01"
                      value={formData.profit}
                      onChange={(e) => handleInputChange('profit', e.target.value)}
                      placeholder="Total profit"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                  disabled={createTripMutation.isPending}
                >
                  {createTripMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving Trip Data...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Trip Data
                    </>
                  )}
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
                    <Button 
                      onClick={processCsvUpload} 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                    >
                      Process Upload
                    </Button>
                  </div>
                </div>
              )}

              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Required CSV Columns:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                  <div>• booking_id</div>
                  <div>• booking_date</div>
                  <div>• origin_location</div>
                  <div>• destination_location</div>
                  <div>• vehicle_no</div>
                  <div>• trip_type</div>
                  <div>• distance_km</div>
                  <div>• fuel_cost</div>
                  <div>• revenue</div>
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
